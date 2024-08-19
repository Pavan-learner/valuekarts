import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    buy: [],
    order:[], // * these array maintaince ordered products array.
    events:[],
  },

  reducers: {
    addToCart: (state, action) => {
      state.cart.push({ ...action.payload, qty: 1 });
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },

    increaseQty: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload._id);
      if (item) {
        item.qty += 1; // Increment qty by 1
      }
    },

    decreaseQty: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload._id);
      if (item && item.qty > 1) {
        item.qty -= 1; // Decrement qty by 1
      }
    },

    // * these function is for when user clicks on the particulars that should be added to the buy now list 
    buyNow: (state, action) => {
      state.buy.push(action.payload);
    },

    clearBuy: (state) => {
      state.buy = [];
    },

    // * this method is for adding products into the ordered product list
    addToOrder: (state,action) => {
      state.order.push(action.payload);
    },

    
    addEvent: (state,action) =>{
        state.events.push({...action.payload})
    },

    removeEvent: (state,action)=>{
      state.events = state.events.filter((item) => item._id !== action.payload._id);
    }
  },
});

// export const {auth,setAuth} = useAuth(); 

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  buyNow,
  clearBuy,
  addToOrder,
  addEvent,
  removeEvent
} = cartSlice.actions;

export default cartSlice.reducer;
