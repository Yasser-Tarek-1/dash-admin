import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AbcIcon from "@mui/icons-material/Abc";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import NoteIcon from "@mui/icons-material/Note";
import BookIcon from "@mui/icons-material/Book";

// sidebar links
export const links = [
  {
    key: "dashboard",
    icon: <DashboardIcon />,
    link: "/admin",
    label: "Dashboard",
  },
  {
    key: "customers",
    icon: <PeopleAltIcon />,
    link: "/admin/customers",
    label: "Customers",
  },
  {
    key: "catalog",
    icon: <ShoppingCartIcon />,
    label: "Catalog",
    children: [
      {
        key: "product",
        icon: <AddBoxIcon />,
        link: "/admin/product",
        label: "Add Product",
      },
      {
        key: "product-list",
        icon: <FormatListBulletedIcon />,
        link: "/admin/product-list",
        label: "Product List",
      },
      {
        key: "brand",
        icon: <AbcIcon />,
        link: "/admin/brand",
        label: "Brand",
      },
      {
        key: "brand-list",
        icon: <FormatListBulletedIcon />,
        link: "/admin/brand-list",
        label: "Brand List ",
      },
      {
        key: "category",
        icon: <CategoryIcon />,
        link: "/admin/category",
        label: "Category",
      },
      {
        key: "category-list",
        icon: <FormatListBulletedIcon />,
        link: "/admin/category-list",
        label: "Category List",
      },
      {
        key: "color",
        icon: <ColorLensIcon />,
        link: "/admin/color",
        label: "Color",
      },
      {
        key: "color-list",
        icon: <FormatListBulletedIcon />,
        link: "/admin/color-list",
        label: "Color List",
      },
    ],
  },
  {
    key: "orders",
    icon: <LocalShippingIcon />,
    link: "/admin/orders",
    label: "Orders",
  },
  {
    key: "marketing",
    icon: <ConnectWithoutContactIcon />,
    label: "Marketing",
    children: [
      {
        key: "coupon",
        icon: <DiscountIcon />,
        link: "/admin/coupon",
        label: "Add Coupon",
      },
      {
        key: "coupon-list",
        icon: <FormatListBulletedIcon />,
        link: "/admin/coupon-list",
        label: "Coupon List",
      },
    ],
  },
  {
    key: "blogs",
    icon: <BookIcon />,
    label: "Blogs",
    children: [
      {
        key: "blog",
        icon: <AddBoxIcon />,
        link: "/admin/blog",
        label: "Add Blog",
      },
      {
        key: "blog-list",
        icon: <FormatListBulletedIcon />,
        link: "/admin/blog-list",
        label: "Blog List",
      },
      {
        key: "blog-category",
        icon: <AddBoxIcon />,
        link: "/admin/blog-category",
        label: "Add Blog Category",
      },
      {
        key: "blog-category-list",
        icon: <FormatListBulletedIcon />,
        link: "/admin/blog-category-list",
        label: "Blog Category List",
      },
    ],
  },
  {
    key: "enquiries",
    icon: <NoteIcon />,
    link: "/admin/enquiries",
    label: "Enquiries",
  },
];
