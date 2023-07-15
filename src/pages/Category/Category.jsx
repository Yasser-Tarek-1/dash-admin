import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";

const Category = () => {
  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        Add Category
      </Typography>
      <form>
        <Stack gap="32px">
          <TextField
            label="Enter Category Name"
            variant="outlined"
            type="text"
            color="secondary"
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "fit-content", fontWeight: 500 }}
          >
            Add New Category
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Protected(Category);
