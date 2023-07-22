import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponsService from "./couponsService";

const initialState = {
  coupons: [],
  coupon: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCoupons = createAsyncThunk(
  "coupons/getCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const res = await couponsService.getCoupons();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (coupon, { rejectWithValue }) => {
    try {
      const res = await couponsService.createCoupon(coupon);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const getCoupon = createAsyncThunk(
  "brand/getCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const res = await couponsService.getCoupon(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "brand/updateCoupon",
  async (coupon, { rejectWithValue }) => {
    try {
      const res = await couponsService.updateCoupon(coupon);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "brand/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const res = await couponsService.deleteCoupon(id);
      return res.data._id;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoupons.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      }),
      builder.addCase(getCoupons.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel fulfilled
      builder.addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons.push(action.payload);
      }),
      // get Coupon
      builder.addCase(getCoupon.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
      }),
      builder.addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupon = action.payload;
      }),
      builder.addCase(getCoupon.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel update Coupon fulfilled
      builder.addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = state.coupons.map((item) => {
          return item._id == action.payload._id ? action.payload : item;
        });
      }),
      // handel delete Coupon fulfilled
      builder.addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = state.coupons.filter((item) => {
          return item._id !== action.payload;
        });
      });
  },
});

export default couponsSlice.reducer;
