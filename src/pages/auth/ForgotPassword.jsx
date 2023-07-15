import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
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
          Please enter valid email
        </Alert>
        <Stack
          direction="column"
          component="form"
          justifyContent="center"
          alignItems="center"
          gap="16px"
        >
          <Typography variant="h5" component="h1" fontWeight="bold">
            Forgot Password
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            id="email"
            label="Email"
            variant="standard"
            type="email"
            color="secondary"
          />
          <Button sx={{ width: "100%" }} variant="contained" color="secondary">
            Send Link
          </Button>
          <Link
            to="/"
            style={{ textDecoration: "underline", marginTop: "-10px" }}
          >
            Return to login?
          </Link>
        </Stack>
      </Box>
    </div>
  );
};

export default ForgotPassword;
