import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";

const initialState = {
  colors: [],
  color: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getColors = createAsyncThunk(
  "color/getColors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await colorService.getColors();
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const createColor = createAsyncThunk(
  "color/createColor",
  async (color, { rejectWithValue }) => {
    try {
      const res = await colorService.createcolor(color);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const getColor = createAsyncThunk(
  "brand/getColor",
  async (id, { rejectWithValue }) => {
    try {
      const res = await colorService.getColor(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateColor = createAsyncThunk(
  "brand/updateColor",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const res = await colorService.updateColor({ id, title });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "brand/deleteColor",
  async (id, { rejectWithValue }) => {
    try {
      const res = await colorService.deleteColor(id);
      return res.data._id;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColors.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload;
      }),
      builder.addCase(getColors.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel fulfilled
      builder.addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors.push(action.payload);
      }),
      // get Color
      builder.addCase(getColor.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
      }),
      builder.addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.color = action.payload;
      }),
      builder.addCase(getColor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel update Color fulfilled
      builder.addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = state.colors.map((item) => {
          return item._id == action.payload._id ? action.payload : item;
        });
      }),
      // handel delete Color fulfilled
      builder.addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = state.colors.filter((item) => {
          return item._id !== action.payload;
        });
      });
  },
});

export default colorSlice.reducer;
