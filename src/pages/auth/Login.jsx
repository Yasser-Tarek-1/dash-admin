import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth">
      <Box
        sx={{
          width: "350px",
          p: "36px",
          borderRadius: "8px",
          bgcolor: "#fff",
        }}
      >
        <Alert sx={{ mb: "16px" }} severity="error">
          Please enter valid password
        </Alert>
        <Stack
          direction="column"
          component="form"
          justifyContent="center"
          alignItems="center"
          gap="16px"
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
          />
          <TextField
            sx={{ width: "100%" }}
            id="password"
            label="Password"
            variant="standard"
            type="password"
            color="secondary"
          />
          <Button sx={{ width: "100%" }} variant="contained" color="secondary">
            Login
          </Button>
          <Link
            to="/forgot-password"
            style={{ textDecoration: "underline", marginTop: "-10px" }}
          >
            Forgot password?
          </Link>
        </Stack>
      </Box>
    </div>
  );
};

export default Login;
