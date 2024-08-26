import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products", // Ensure this matches your Product model name
      },
    ],

    variety: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],

    buyer: {
      type: mongoose.ObjectId,
      ref: "User", // Ensure this matches your User model name
    },
    address: {
      type: String,
      required: true, // Consider adding this field if you need to store the address
    },

    deliveryDate: {
      type: Date,
    },

    returnExpiryDate: {
      type: Date,
    },

    returnDays: {
      type: Number,
    },

    total: {
      type: Number,
      required: true, // Consider adding this field if you want to store the total price
    },

    status: {
      type: String,
      default: "Not Process",
      enum: [
        "Not Process",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Return",
        "Returned",
      ], // Corrected enum values
    },

    reason: {
      type: String,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

export default mongoose.model("Order", orderSchema);
