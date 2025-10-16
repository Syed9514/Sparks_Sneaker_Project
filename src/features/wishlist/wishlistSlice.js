import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import wishlistService from './wishlistService';

const initialState = {
  items: [], // This will hold product objects
  isLoading: false,
  isError: false,
  message: '',
};

// Get user wishlist from backend
export const getWishlist = createAsyncThunk('wishlist/get', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await wishlistService.getWishlist(token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Toggle item in wishlist
export const toggleWishlist = createAsyncThunk('wishlist/toggle', async (productId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await wishlistService.toggleWishlist(productId, token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(toggleWishlist.pending, (state) => {
        // Optionally handle loading state for individual items
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.items = action.payload; // The backend returns the updated wishlist
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = wishlistSlice.actions;
export default wishlistSlice.reducer;