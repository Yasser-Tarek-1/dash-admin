import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bCategoryService from "./bCategoriesService";

const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getbCategory = createAsyncThunk(
  "bCategories/getbCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await bCategoryService.getbCategory();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const bCategoriesSlice = createSlice({
  name: "bCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getbCategory.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getbCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      }),
      builder.addCase(getbCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default bCategoriesSlice.reducer;
