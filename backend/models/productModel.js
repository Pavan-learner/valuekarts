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
      type: mongoose.ObjectId,
      ref: "Category",
    //   required: true,
    },
    
    variety: {
      type: String,
    },

    imgLink: {
      type: Array,
      deffault: [],
    },

    qty: {
      type: Number,
      required: true,
    },  

    // * cloudnary or AWS or MongoDB [Now we are using mongoDB]
    photo: {
      data: Buffer,
      contentType: String,
    },

    shipping: {
      type: Boolean,
    },

    
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
