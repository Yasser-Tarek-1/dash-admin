import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";

const initialState = {
  brands: [],
  brand: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBrands = createAsyncThunk(
  "brand/getBrands",
  async (_, { rejectWithValue }) => {
    try {
      const res = await brandService.getBrands();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (brand, { rejectWithValue }) => {
    try {
      const res = await brandService.createBrand(brand);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const getBrand = createAsyncThunk(
  "brand/getBrand",
  async (id, { rejectWithValue }) => {
    try {
      const res = await brandService.getBrand(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const res = await brandService.updateBrand({ id, title });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (id, { rejectWithValue }) => {
    try {
      const res = await brandService.deleteBrand(id);
      return res.data._id;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload;
      }),
      builder.addCase(getBrands.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel create brand fulfilled
      builder.addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands.push(action.payload);
      }),
      // get Brand
      builder.addCase(getBrand.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
      }),
      builder.addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brand = action.payload;
      }),
      builder.addCase(getBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel update brand fulfilled
      builder.addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = state.brands.map((item) => {
          return item._id == action.payload._id ? action.payload : item;
        });
      }),
      // handel delete brand fulfilled
      builder.addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = state.brands.filter((item) => {
          return item._id !== action.payload;
        });
      });
  },
});

export default brandSlice.reducer;
