import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
  categories: [],
  category: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await categoryService.getCategories();
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/categorySlice",
  async (category, { rejectWithValue }) => {
    try {
      const res = await categoryService.createCategory(category);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const getCategory = createAsyncThunk(
  "brand/getCategory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await categoryService.getCategory(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "brand/updateCategory",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const res = await categoryService.updateCategory({ id, title });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "brand/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await categoryService.deleteCategory(id);
      return res.data._id;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      }),
      builder.addCase(getCategories.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel fulfilled
      builder.addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories.push(action.payload);
      }),
      // get Category
      builder.addCase(getCategory.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
      }),
      builder.addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.category = action.payload;
      }),
      builder.addCase(getCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel update Category fulfilled
      builder.addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.map((item) => {
          return item._id == action.payload._id ? action.payload : item;
        });
      }),
      // handel delete Category fulfilled
      builder.addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.filter((item) => {
          return item._id !== action.payload;
        });
      });
  },
});

export default categorySlice.reducer;
