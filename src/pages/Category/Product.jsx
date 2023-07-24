import { Box, Typography } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import ProductForm from "./ProductForm";

import {
  deleteImage,
  uploadImage,
  deleteAllImageWhenSubmitForm,
} from "../../features/upload/uploadSlice";
import {
  createProduct,
  getProduct,
  deleteProductImage,
  updateProduct,
} from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

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
    products: { product },
  } = useSelector((state) => state);

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  const initialValues = {
    title: product.title || "",
    description: product.description || "",
    price: product.price || "",
    category: product.category || "",
    tags: product.tags || "",
    brand: product.brand || "",
    color: product.color || "",
    quantity: product.quantity || "",
    images: product.images || [],
  };

  const onSubmit = (values) => {
    if (id && product) {
      // check if user upload images or not
      // Update
      if (images.length > 0 || product.images.length > 0) {
        const imagesArray = images.map(({ public_id, url }) => {
          return { public_id, url };
        });

        dispatch(
          updateProduct({
            id,
            ...values,
            color: values.color.split(" "),
            images: [...imagesArray, ...product.images],
          })
        )
          .unwrap()
          .then(() => {
            toast.success(`${formik.values.title} Updated successfully`);
            formik.resetForm();
            dispatch(deleteAllImageWhenSubmitForm());
            setTimeout(() => {
              navigate("/admin/product-list");
            }, 1000);
          })
          .catch((err) => {
            toast.error(err);
          });
        setError("");
      } else {
        setError("Please enter an image");
      }
    } else {
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
            toast.success(`Product ${formik.values.title} added successfully`);
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
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: ProductSchema,
    onSubmit: (values) => onSubmit(values),
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
      .then((res) => {
        // delete image local from Product {}
        dispatch(deleteProductImage(res));
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const allImages = images.concat(product?.images);

  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        {id && product ? "Edit" : "Add"} Product
      </Typography>
      <ProductForm
        formik={formik}
        imagesHandler={imagesHandler}
        error={error}
        setError={setError}
        onDeleteImage={onDeleteImage}
        brands={brands}
        categories={categories}
        images={allImages}
        colors={colors}
      />
    </Box>
  );
};

export default Protected(Product);
