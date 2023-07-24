import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogsService from "./blogsService";

const initialState = {
  blogs: [],
  blog: { images: [] },
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await blogsService.getblogs();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blog, { rejectWithValue }) => {
    try {
      const res = await blogsService.createBlog(blog);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blogs/getBlog",
  async (id, { rejectWithValue }) => {
    try {
      const res = await blogsService.getBlog(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (blog, { rejectWithValue }) => {
    try {
      const res = await blogsService.updateBlog(blog);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const res = await blogsService.deleteBlog(id);
      return res.data._id;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const blogsSlice = createSlice({
  name: "blogsSlice",
  initialState,
  reducers: {
    deleteBlogImage: (state, { payload }) => {
      state.blog.images = state.blog.images.filter((img) => {
        return img.public_id !== payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogs.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    }),
      builder.addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      }),
      builder.addCase(getBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel fulfilled
      builder.addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs.push(action.payload);
      }),
      // get Blog
      builder.addCase(getBlog.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
      }),
      builder.addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload;
      }),
      builder.addCase(getBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      }),
      // handel update Blog fulfilled
      builder.addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = state.blogs.map((item) => {
          return item._id == action.payload._id ? action.payload : item;
        });
      }),
      // handel delete Blog fulfilled
      builder.addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = state.blogs.filter((item) => {
          return item._id !== action.payload;
        });
      });
  },
});

export const { deleteBlogImage } = blogsSlice.actions;
export default blogsSlice.reducer;
