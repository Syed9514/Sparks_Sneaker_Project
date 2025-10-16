import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Async thunks for backend interaction
export const getCart = createAsyncThunk('cart/get', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await cartService.getCart(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const addToCart = createAsyncThunk('cart/add', async (itemData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await cartService.addToCart(itemData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const removeFromCart = createAsyncThunk('cart/remove', async (productId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await cartService.removeFromCart(productId, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => initialState,
    // We can keep local reducers for non-logged-in users if desired,
    // but for now, we'll focus on the backend integration.
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload; // Backend returns the updated cart
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload; // Backend returns the updated cart
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;