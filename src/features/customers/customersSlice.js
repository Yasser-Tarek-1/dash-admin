import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customersService from "./customersService";

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await customersService.getCustomers();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomers.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      }),
      builder.addCase(getCustomers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default customersSlice.reducer;
