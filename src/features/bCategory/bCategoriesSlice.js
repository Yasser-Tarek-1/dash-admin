import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bCategoryService from "./bCategoriesService";

const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBCategory = createAsyncThunk(
  "bCategories/getBCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await bCategoryService.getBCategory();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const createBCategory = createAsyncThunk(
  "bCategories/createBCategory",
  async (bCategory, { rejectWithValue }) => {
    try {
      const res = await bCategoryService.createBCategory(bCategory);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const bCategoriesSlice = createSlice({
  name: "bCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBCategory.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      }),
      builder.addCase(getBCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel fulfilled
      builder.addCase(createBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bCategories.push(action.payload);
      });
  },
});

export default bCategoriesSlice.reducer;
