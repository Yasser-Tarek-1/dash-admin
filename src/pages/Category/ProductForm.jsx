import { Button, MenuItem, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useDispatch, useSelector } from "react-redux";
import { getcolors } from "../../features/color/colorSlice";
import { getCategories } from "../../features/category/categorySlice";
import { getBrands } from "../../features/brand/brandSlice";
import { useEffect } from "react";

const ProductForm = ({ formik, images, imagesHandler, error, setError }) => {
  const {
    brand: { brands },
    category: { categories },
    color: { colors },
  } = useSelector((state) => state);
  const dispatch = useDispatch("");

  useEffect(() => {
    dispatch(getcolors());
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  return (
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
        placeholder="Enter Product Des"
        multiline
        maxRows={6}
        minRows={3}
        color="secondary"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <TextField
        name="price"
        label="Enter Product Price"
        variant="outlined"
        type="number"
        color="secondary"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
      />
      <TextField
        select
        label="Select Category"
        color="secondary"
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.category && Boolean(formik.errors.category)}
        helperText={formik.touched.category && formik.errors.category}
      >
        {categories.map(({ _id, title }) => (
          <MenuItem
            key={_id}
            value={title}
            sx={{ textTransform: "capitalize" }}
          >
            {title}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="brand"
        select
        label="Select Brand"
        color="secondary"
        value={formik.values.brand}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.brand && Boolean(formik.errors.brand)}
        helperText={formik.touched.brand && formik.errors.brand}
      >
        {brands.map(({ _id, title }) => (
          <MenuItem
            key={_id}
            value={title}
            sx={{ textTransform: "capitalize" }}
          >
            {title}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="color"
        select
        label="Select Color"
        color="secondary"
        value={formik.values.color}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.color && Boolean(formik.errors.color)}
        helperText={formik.touched.color && formik.errors.color}
      >
        {colors.map(({ _id, title }) => (
          <MenuItem
            key={_id}
            value={title}
            sx={{ textTransform: "capitalize" }}
          >
            {title}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="quantity"
        label="Enter Product Quantity"
        variant="outlined"
        type="number"
        color="secondary"
        value={formik.values.quantity}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
        helperText={formik.touched.quantity && formik.errors.quantity}
      />
      <MuiFileInput
        name="images"
        color="secondary"
        label="Drag 'n' drop some files here, or click to select files"
        value={images}
        onChange={imagesHandler}
        multiple
        helperText={error && error}
        error={error ? true : false}
        onBlur={() => setError("")}
      />
      <Button variant="contained" color="secondary" type="submit">
        Add Product
      </Button>
    </form>
  );
};

export default ProductForm;
