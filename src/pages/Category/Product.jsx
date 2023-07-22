import { Box, Typography } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import ProductForm from "./ProductForm";

import {
  deleteImage,
  uploadImage,
  deleteAllImageWhenSubmitForm,
} from "../../features/upload/uploadSlice";
import { createProduct } from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
// Product Schema
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
  tags: Yup.string().required("Required"),
  brand: Yup.string().required("Required"),
  color: Yup.string().required("Required"),
  quantity: Yup.string().required("Required"),
});

const Product = () => {
  const {
    brand: { brands },
    category: { categories },
    color: { colors },
    upload: { images },
  } = useSelector((state) => state);

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      tags: "",
      brand: "",
      color: "",
      quantity: "",
      images: [],
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      // check if user upload images or not
      if (images.length > 0) {
        const imagesArray = images.map(({ public_id, url }) => {
          return { public_id, url };
        });
        dispatch(
          createProduct({
            ...values,
            color: values.color.split(" "),
            images: imagesArray,
          })
        )
          .unwrap()
          .then(() => {
            toast.success("Product added successfully");
            formik.resetForm();
            dispatch(deleteAllImageWhenSubmitForm());
          })
          .catch((err) => {
            if (err?.includes("E11000 duplicate key error collection")) {
              toast.error(`Product ${formik.values.title} already exists`);
            } else {
              toast.error(err);
            }
          });
        setError("");
      } else {
        setError("Please enter a image");
      }
    },
  });

  // upload images fun
  const imagesHandler = (images) => {
    dispatch(uploadImage(images))
      .unwrap()
      .catch((err) => {
        toast.error(err);
      });
  };

  // delete images fun
  const onDeleteImage = (id) => {
    dispatch(deleteImage(id))
      .unwrap()
      .catch((err) => {
        toast.error(err);
      });
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
        imagesHandler={imagesHandler}
        error={error}
        setError={setError}
        onDeleteImage={onDeleteImage}
        brands={brands}
        categories={categories}
        images={images}
        colors={colors}
      />
    </Box>
  );
};

export default Protected(Product);
