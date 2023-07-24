import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import {
  deleteImage,
  uploadImage,
  deleteAllImageWhenSubmitForm,
} from "../../features/upload/uploadSlice";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { MuiFileInput } from "mui-file-input";
import ImageShower from "../Category/ImageShower";

import {
  createBlog,
  getBlog,
  updateBlog,
  deleteBlogImage,
} from "../../features/blogs/blogsSlice";
import { useNavigate, useParams } from "react-router-dom";

// Blog Schema
const BlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .required("Required"),
  category: Yup.string().required("Required"),
});

const Blog = () => {
  const {
    bCategories: { bCategories },
    upload: { images },
    blogs: { blog },
  } = useSelector((state) => state);

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [dispatch, id]);

  const initialValues = {
    title: blog.title || "",
    description: blog.description || "",
    category: blog.category || "",
    images: blog.images || [],
  };

  const onSubmit = (values) => {
    if (blog && id) {
      // check if user upload images or not
      // Update
      if (images.length > 0 || blog.images.length > 0) {
        const imagesArray = images.map(({ public_id, url }) => {
          return { public_id, url };
        });
        dispatch(
          updateBlog({
            id,
            ...values,
            images: [...imagesArray, ...blog.images],
          })
        )
          .unwrap()
          .then(() => {
            toast.success(`${formik.values.title} Updated successfully`);
            formik.resetForm();
            dispatch(deleteAllImageWhenSubmitForm());
            setTimeout(() => {
              navigate("/admin/blog-list");
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
      // Add
      if (images.length > 0) {
        const imagesArray = images.map(({ public_id, url }) => {
          return { public_id, url };
        });
        dispatch(
          createBlog({
            ...values,
            images: imagesArray,
          })
        )
          .unwrap()
          .then(() => {
            toast.success(`${formik.values.title} added successfully`);
            formik.resetForm();
            dispatch(deleteAllImageWhenSubmitForm());
          })
          .catch((err) => {
            toast.error(err);
          });
        setError("");
      } else {
        setError("Please enter an image");
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: BlogSchema,
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
        // delete image local from blog {}
        dispatch(deleteBlogImage(res));
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const allImages = images.concat(blog?.images);

  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        {id && blog ? "Edit" : "Add"} Blog
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "32px" }}
      >
        <TextField
          name="title"
          label="Enter Product Name"
          variant="outlined"
          type="text"
          color="secondary"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          name="description"
          variant="outlined"
          placeholder="Enter Blog Des"
          multiline
          maxRows={6}
          minRows={3}
          color="secondary"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          select
          label="Select Blog Category"
          color="secondary"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        >
          {bCategories.map(({ title, _id }) => (
            <MenuItem
              key={_id}
              value={title}
              sx={{ textTransform: "capitalize" }}
            >
              {title}
            </MenuItem>
          ))}
        </TextField>
        <MuiFileInput
          color="secondary"
          label="Drag 'n' drop some files here, or click to select files"
          onChange={imagesHandler}
          multiple
          helperText={error && error}
          error={error ? true : false}
          onBlur={() => setError("")}
        />
        <ImageShower images={allImages} onDeleteImage={onDeleteImage} />
        <Button variant="contained" color="secondary" type="submit">
          {id && blog ? "Update" : "Add New"} Blog
        </Button>
      </form>
    </Box>
  );
};

export default Protected(Blog);
