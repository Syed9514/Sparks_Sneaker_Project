import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "../redux/wishlistSlice";
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    products: productReducer,
  },
});

export default store;
