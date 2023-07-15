import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const BlogCategory = () => {
  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        Add Blog Category
      </Typography>
      <form>
        <Stack gap="32px">
          <TextField
            label="Enter Blog Category Name"
            variant="outlined"
            type="text"
            color="secondary"
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "fit-content", fontWeight: 500 }}
          >
            Add Blog Category
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default BlogCategory;
