import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: user,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/adminLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await authService.login(userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response.data.message || error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload == "Invalid Credentials") {
          state.message = "The password is wrong";
        } else if (
          action.payload == "Cannot read properties of null (reading 'role')"
        ) {
          state.message = "You do not have access";
        } else {
          state.message = "Something went wrong, try later";
        }
      });
  },
});

export default authSlice.reducer;
