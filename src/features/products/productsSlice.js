import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsService";

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await productsService.getProducts();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const res = await productsService.createProduct(product);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get products
    builder.addCase(getProducts.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      }),
      builder.addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
    // add products
    // builder.addCase(createProduct.pending, (state) => {
    //   state.isError = false;
    //   state.isSuccess = false;
    //   state.isLoading = true;
    // }),
    //   builder.addCase(createProduct.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.products = action.payload;
    //   }),
    //   builder.addCase(createProduct.rejected, (state, action) => {
    //     state.isError = true;
    //     state.isLoading = false;
    //     state.message = action.payload;
    //   });
  },
});

export default productsSlice.reducer;
