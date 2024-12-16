import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart_actions'; 
import authSlice from './auth_action'; 
import searchSlice from './search_action';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    search: searchSlice
  },
});

export default store;
