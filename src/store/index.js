import { configureStore } from "@reduxjs/toolkit";
import user from "./auth/authSlice";

export const store = configureStore({
  reducer: { user },
});
