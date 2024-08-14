import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
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

    photo:{
      type: String,
    },
    // This is for admin purpose 
    stock: {
      type: Number,
      required: true,
    },

    // * For storing image data

    shipping: {
      type: String,
      default: '4-5 days delivery',
      required: true,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
