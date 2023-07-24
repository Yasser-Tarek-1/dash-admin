import { createBrowserRouter } from "react-router-dom";
import Root from "./app/Root";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Product from "./pages/Category/Product";
import ProductList from "./pages/Category/ProductList";
import Brand from "./pages/Category/Brand";
import BrandList from "./pages/Category/BrandList";
import Category from "./pages/Category/Category";
import CategoryList from "./pages/Category/CategoryList";
import Color from "./pages/Category/Color";
import ColorList from "./pages/Category/ColorList";
import Coupon from "./pages/Marketing/Coupon";
import CouponList from "./pages/Marketing/CouponList";
import Blog from "./pages/Blogs/Blog";
import BlogList from "./pages/Blogs/BlogList";
import BlogCategory from "./pages/Blogs/BlogCategory";
import BlogCategoryList from "./pages/Blogs/BlogCategoryList";
import Enquiries from "./pages/Enquiries";
import ViewEnquiry from "./pages/ViewEnquiry";
import ViewOrder from "./pages/ViewOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/admin",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      // Category
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "product-list",
        element: <ProductList />,
      },
      {
        path: "brand",
        element: <Brand />,
      },
      {
        path: "brand/:id",
        element: <Brand />,
      },
      {
        path: "brand-list",
        element: <BrandList />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "category/:id",
        element: <Category />,
      },
      {
        path: "category-list",
        element: <CategoryList />,
      },
      {
        path: "color",
        element: <Color />,
      },
      {
        path: "color/:id",
        element: <Color />,
      },
      {
        path: "color-list",
        element: <ColorList />,
      },

      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <ViewOrder />,
      },
      // Marketing
      {
        path: "coupon",
        element: <Coupon />,
      },
      {
        path: "coupon/:id",
        element: <Coupon />,
      },
      {
        path: "coupon-list",
        element: <CouponList />,
      },
      // Blogs
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <Blog />,
      },
      {
        path: "blog-list",
        element: <BlogList />,
      },
      {
        path: "blog-category",
        element: <BlogCategory />,
      },
      {
        path: "blog-category/:id",
        element: <BlogCategory />,
      },
      {
        path: "blog-category-list",
        element: <BlogCategoryList />,
      },
      {
        path: "enquiries",
        element: <Enquiries />,
      },
      {
        path: "enquiries/:id",
        element: <ViewEnquiry />,
      },
    ],
  },
]);

export default router;
