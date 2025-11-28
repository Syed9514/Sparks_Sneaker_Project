import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
  products: [],
  trendingProducts: [],
  categoryProducts: [],
  status: 'idle', // <-- ADD STATUS FIELD ('idle', 'loading', 'succeeded', 'failed')
  isError: false,
  categoryStatus: 'idle',
  // isLoading: false, // <-- REMOVE isLoading (status replaces it)
  message: '',
};

// Get all products
export const getProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get trending products
export const getTrendingProducts = createAsyncThunk('products/getTrending', async (_, thunkAPI) => {
    try {
      return await productService.getTrendingProducts();
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

export const getProductsByCategory = createAsyncThunk('products/getByCategory', async (category, thunkAPI) => {
  try {
    return await productService.getProductsByCategory(category);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.products = [];
      state.categoryProducts = [];
      state.trendingProducts = [];
      state.status = 'idle';
      state.categoryStatus = 'idle';
      state.isError = false;
      state.message = '';
    },
    resetCategory: (state) => { // Specific reset for category view
        state.categoryProducts = [];
        state.categoryStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading'; // <-- Set status
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; // <-- Set status
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed'; // <-- Set status
        state.isError = true;
        state.message = action.payload;
      })
      // Keep trending logic separate if needed, or unify status
      .addCase(getTrendingProducts.pending, (state) => {
        // You might want a separate status for trending if fetches can happen independently
        // For simplicity now, we'll keep it as is.
      })
      .addCase(getTrendingProducts.fulfilled, (state, action) => {
        state.trendingProducts = action.payload;
      })
      .addCase(getTrendingProducts.rejected, (state, action) => {
        state.isError = true; // Maybe use a separate error flag for trending
        state.message = action.payload;
      })

      // --- NEW: Cases for getProductsByCategory ---
      .addCase(getProductsByCategory.pending, (state) => {
        state.categoryStatus = 'loading';
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.categoryProducts = action.payload; // Store in the new state field
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.isError = true; // Consider a separate error flag if needed
        state.message = action.payload;
      });
  },
});

export const { reset, resetCategory } = productSlice.actions;
export default productSlice.reducer;