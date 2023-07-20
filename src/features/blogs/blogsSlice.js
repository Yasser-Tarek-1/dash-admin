import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogsService from "./blogsService";

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await blogsService.getblogs();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const blogsSlice = createSlice({
  name: "blogsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogs.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      }),
      builder.addCase(getBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default blogsSlice.reducer;
