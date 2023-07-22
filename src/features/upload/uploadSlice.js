import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const uploadImage = createAsyncThunk(
  "upload/uploadImage",
  async (image, { rejectWithValue }) => {
    try {
      const files = new FormData();
      for (let i = 0; i < image.length; i++) {
        files.append("images", image[i]);
      }
      const res = await uploadService.uploadImage(files);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "upload/deleteImage",
  async (id, { rejectWithValue }) => {
    try {
      await uploadService.deleteImage(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    deleteAllImageWhenSubmitForm(state) {
      state.images = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images.push(...action.payload);
      }),
      builder.addCase(uploadImage.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
    // delete img
    // dont need rejected or pending => we will handel error with then and catch
    builder.addCase(deleteImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.images = state.images.filter((img) => {
        return img.public_id !== action.payload;
      });
    });
  },
});

export const { deleteAllImageWhenSubmitForm } = uploadSlice.actions;
export default uploadSlice.reducer;
