import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bCategoryService from "./bCategoriesService";

const initialState = {
  bCategories: [],
  bCategory: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBCategories = createAsyncThunk(
  "bCategories/getBCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await bCategoryService.getBCategories();
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

export const getBCategory = createAsyncThunk(
  "brand/getBCategory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await bCategoryService.getBCategory(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateBCategory = createAsyncThunk(
  "brand/updateBCategory",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const res = await bCategoryService.updateBCategory({ id, title });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteBCategory = createAsyncThunk(
  "brand/deleteBCategory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await bCategoryService.deleteBCategory(id);
      return res.data._id;
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
    builder.addCase(getBCategories.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getBCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      }),
      builder.addCase(getBCategories.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel fulfilled
      builder.addCase(createBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bCategories.push(action.payload);
      }),
      // get BCategory
      builder.addCase(getBCategory.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
      }),
      builder.addCase(getBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bCategory = action.payload;
      }),
      builder.addCase(getBCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel update BCategory fulfilled
      builder.addCase(updateBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bCategories = state.bCategories.map((item) => {
          return item._id == action.payload._id ? action.payload : item;
        });
      }),
      // handel delete BCategory fulfilled
      builder.addCase(deleteBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bCategories = state.bCategories.filter((item) => {
          return item._id !== action.payload;
        });
      });
  },
});

export default bCategoriesSlice.reducer;
