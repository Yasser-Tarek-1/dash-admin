import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authSlice";
import ProtectedAuth from "../../components/ProtectRoute/ProtectedAuth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(24, "Password can be maximum 24 characters")
    .required("Required"),
});

const Login = () => {
  const { isError, message, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(login(values))
        .unwrap()
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res));
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="auth">
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Box
          sx={{
            width: "350px",
            p: "36px",
            borderRadius: "8px",
            bgcolor: "#fff",
          }}
        >
          {isError && (
            <Alert sx={{ mb: "16px" }} severity="error">
              {message}
            </Alert>
          )}
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Typography variant="h4" component="h1" fontWeight="bold">
              Login
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              id="email"
              label="Email"
              variant="standard"
              type="email"
              color="secondary"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ width: "100%" }}
              id="password"
              label="Password"
              variant="standard"
              type="password"
              color="secondary"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              color="secondary"
              type="submit"
            >
              Login
            </Button>
            <Link
              to="/forgot-password"
              style={{ textDecoration: "underline", marginTop: "-10px" }}
            >
              Forgot password?
            </Link>
          </form>
        </Box>
      )}
    </div>
  );
};

export default ProtectedAuth(Login);
