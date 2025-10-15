import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isOpen: false,
  notification: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      const productLimit = action.payload.limit || 3;

      if (existing) {
        if (existing.quantity >= productLimit) {
          state.notification = `${action.payload.name} reached purchase limit of ${productLimit}.`;
        } else {
          existing.quantity += 1;
          state.notification = null;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.notification = null;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQty: (state, action) => {
      
      const item = state.items.find((i) => i.id === action.payload);
      

      if (item) {
        const productLimit = item.limit || 3;
        if (item.quantity >= productLimit) {
          state.notification = `${item.name} reached the limit of ${productLimit}.`;
        } else {
          item.quantity += 1;
          state.notification = null;
        }
      }
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // optional: auto-remove when qty is 1 and clicked again
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  toggleCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearNotification
} = cartSlice.actions;

export default cartSlice.reducer;
