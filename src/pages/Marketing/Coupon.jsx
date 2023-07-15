import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Coupon = () => {
  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        Add Coupon
      </Typography>
      <form>
        <Stack gap="32px">
          <TextField
            label="Enter Coupon Name"
            variant="outlined"
            type="text"
            color="secondary"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ width: "100%" }} components={["DatePicker"]}>
              <DatePicker label="Enter Expiry Day" />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            label="Enter Discount"
            variant="outlined"
            type="number"
            color="secondary"
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "fit-content", fontWeight: 500 }}
          >
            Add New Coupon
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Coupon;
