import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    id: {
      type: Number,
    },

    name: {
      type: String,
      required: true,
    },

    // * for SEO friendly.
    slug: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // * Original price

    originalPrice: {
      type: Number,
    },

    // * discounted price
    price: {
      type: Number,
      required: true,
    },

    // * we are adding the product into the category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    imgLink: {
      type: [String], // Array of strings
      default: [],
    },

    variety: {
      type: [String], // Array of strings
      default: [],
    },

    // * this is for user purpose
    qty: {
      type: Number,
      default: 0,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    // This is for admin purpose
    stock: {
      type: Number,
      required: true,
    },

    // * For storing image data

    shipping: {
      type: String,
      default: "4-5 days delivery",
      required: true,
    },

    // * This is for handling the delivery charges.

    deliveryCharge: {
      type: Number,
      default: 70,
    },

    returnDays: {
      type: Number,
      default: 3,
    },
    // * This is for storing the user ratings abour admin products.

    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true, min: 1, max: 5 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
