import { Box, Button, TextField, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Protected from "../../components/ProtectRoute/Protect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createCoupon } from "../../features/coupons/couponsSlice";
import { toast } from "react-hot-toast";

const Coupon = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      expiry: Yup.string().required("Required"),
      discount: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(createCoupon(values))
        .unwrap()
        .then(({ name }) => {
          toast.success(`Coupon ${name} added successfully`);
          formik.resetForm();
        })
        .catch((err) => {
          if (err?.includes("E11000 duplicate key error collection")) {
            toast.error(`${values.name} already exists`);
          } else {
            toast.error(`${err}`);
          }
        });
    },
  });

  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        Add Coupon
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "32px",
        }}
      >
        <TextField
          label="Enter Coupon Name"
          variant="outlined"
          type="text"
          color="secondary"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer sx={{ width: "100%" }} components={["DatePicker"]}>
            <DatePicker
              label="Expiry Date"
              format="DD/MM/YYYY"
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue("expiry", value, true)}
              slotProps={{
                textField: {
                  variant: "outlined",
                  error: formik.touched.expiry && Boolean(formik.errors.expiry),
                  helperText: formik.touched.expiry && formik.errors.expiry,
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          label="Enter Discount"
          variant="outlined"
          type="number"
          color="secondary"
          name="discount"
          value={formik.values.discount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.discount && Boolean(formik.errors.discount)}
          helperText={formik.touched.discount && formik.errors.discount}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "fit-content", fontWeight: 500 }}
          type="submit"
        >
          Add New Coupon
        </Button>
      </form>
    </Box>
  );
};

export default Protected(Coupon);
