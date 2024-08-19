import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
    // these helps to login only one user with one email
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    // required: true,
  },

  address: {
    type: String,
  },

  role: {
    type: Number,
    default: 0,
  },

  cart: {
    type: [mongoose.Schema.Types.Mixed], // Changed 'typeof' to 'type' and used Mixed to allow any item structure
    default: [],
  },

  orders: {
    type: [mongoose.Schema.Types.Mixed], // Same change as cart
    default: [],
  },
  
},{timestamps:true});


export default mongoose.model('User',userModel);