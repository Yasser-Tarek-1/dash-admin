import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const Brand = () => {
  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        Add Brand
      </Typography>
      <form>
        <Stack gap="32px">
          <TextField
            label="Enter Brand Name"
            variant="outlined"
            type="text"
            color="secondary"
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "fit-content", fontWeight: 500 }}
          >
            Add New Brand
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Brand;
