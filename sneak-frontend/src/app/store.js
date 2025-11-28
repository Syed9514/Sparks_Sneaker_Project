import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";
// import wishlistReducer from "../redux/wishlistSlice";
import wishlistReducer from '../features/wishlist/wishlistSlice';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/orders/orderSlice';
import uiReducer from '../features/ui/uiSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    products: productReducer,
    orders: orderReducer,
    ui: uiReducer,
  },
});

export default store;
