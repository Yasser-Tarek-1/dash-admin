import { configureStore } from "@reduxjs/toolkit";
import user from "../features/auth/authSlice";
import customers from "../features/customers/customersSlice";
import products from "../features/products/productsSlice";
import brand from "../features/brand/brandSlice";
import color from "../features/color/colorSlice";
import category from "../features/category/categorySlice";
import orders from "../features/orders/ordersSlice";
import coupons from "../features/coupons/couponsSlice";
import blogs from "../features/blogs/blogsSlice";
import bCategories from "../features/bCategory/bCategoriesSlice";
import enquiries from "../features/enquiries/enquiriesSlice";

export const store = configureStore({
  reducer: {
    user,
    customers,
    products,
    brand,
    color,
    category,
    orders,
    coupons,
    blogs,
    bCategories,
    enquiries,
  },
});
