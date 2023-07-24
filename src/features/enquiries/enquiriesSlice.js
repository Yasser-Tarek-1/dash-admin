import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiriesService from "./enquiriesService";

const initialState = {
  enquiries: [],
  enquiry: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getEnquiries = createAsyncThunk(
  "enquiries/getEnquiries",
  async (_, { rejectWithValue }) => {
    try {
      const res = await enquiriesService.getEnquiries();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const getEnquiry = createAsyncThunk(
  "enquiries/getEnquiry",
  async (id, { rejectWithValue }) => {
    try {
      const res = await enquiriesService.getEnquiry(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateEnquiry = createAsyncThunk(
  "enquiries/updateEnquiry",
  async (enquiry, { rejectWithValue }) => {
    try {
      const res = await enquiriesService.updateEnquiry(enquiry);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiries/deleteEnquiry",
  async (id, { rejectWithValue }) => {
    try {
      const res = await enquiriesService.deleteEnquiry(id);
      return res.data._id;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const enquiriesSlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEnquiries.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      }),
      builder.addCase(getEnquiries.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // get Enquiry
      builder.addCase(getEnquiry.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
      }),
      builder.addCase(getEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
      }),
      builder.addCase(getEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }), // handel update Enquiry fulfilled
      builder.addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiries = state.enquiries.map((item) => {
          return item._id == action.payload._id ? action.payload : item;
        });
      }),
      // handel delete Enquiry fulfilled
      builder.addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiries = state.enquiries.filter((item) => {
          return item._id !== action.payload;
        });
      });
  },
});

export default enquiriesSlice.reducer;
