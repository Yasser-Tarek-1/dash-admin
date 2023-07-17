import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponsService from "./couponsService";

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (_, { rejectWithValue }) => {
    try {
      const res = await couponsService.createCoupon();
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(createCoupon.pending, (state) => {
  //       state.isError = false;
  //       state.isSuccess = false;
  //       state.isLoading = true;
  //     }),
  //       builder.addCase(createCoupon.fulfilled, (state, action) => {
  //         state.isLoading = false;
  //         state.isSuccess = true;
  //         state.coupons = action.payload;
  //       }),
  //       builder.addCase(createCoupon.rejected, (state, action) => {
  //         state.isError = true;
  //         state.isLoading = false;
  //         state.message = action.payload;
  //       });
  //   },
});

export default couponsSlice.reducer;
