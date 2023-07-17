import { Box, Typography } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import ProductForm from "./ProductForm";

const ProductSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .required("Required"),
  price: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  brand: Yup.string().required("Required"),
  color: Yup.string().required("Required"),
  quantity: Yup.string().required("Required"),
});

const Product = () => {
  const [images, setImages] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      if (images) {
        console.log({ ...values, images });
        setError("");
        // login here
      } else {
        setError("Please enter a image");
      }
    },
  });

  const imagesHandler = (images) => {
    setImages(images);
    setError("");
  };

  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        Add Product
      </Typography>
      <ProductForm
        formik={formik}
        images={images}
        imagesHandler={imagesHandler}
        error={error}
        setError={setError}
      />
    </Box>
  );
};

export default Protected(Product);
