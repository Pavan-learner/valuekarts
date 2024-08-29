import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    altPhone: {
      type: String,
    },

    address: {
      type: String,
    },

    role: {
      type: Number,
      default: 0,
    },

    cart: {
      type: [Object], // Changed 'typeof' to 'type' and used Mixed to allow any item structure
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userModel);
