import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProtectedAuth from "../../components/ProtectRoute/ProtectedAuth";

const ResetPassword = () => {
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
          <Typography variant="h5" component="h1" fontWeight="bold">
            Reset Password
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            id="password"
            label="New Password"
            variant="standard"
            type="password"
            color="secondary"
          />
          <TextField
            sx={{ width: "100%" }}
            id="confirm_password"
            label="Confirm Password"
            variant="standard"
            type="confirm_password"
            color="secondary"
          />
          <Button sx={{ width: "100%" }} variant="contained" color="secondary">
            Continue
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

export default ProtectedAuth(ResetPassword);
