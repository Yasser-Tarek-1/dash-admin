import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import Protected from "../../components/ProtectRoute/Protect";

const Blog = () => {
  const [blog, setBlog] = useState("");
  const [file, setFile] = useState(null);

  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        Add Blog
      </Typography>
      <form>
        <Stack gap="32px">
          <TextField
            label="Enter Blog Title"
            variant="outlined"
            type="text"
            color="secondary"
          />
          <TextField
            variant="outlined"
            placeholder="Enter Blog Details"
            multiline
            maxRows={6}
            minRows={3}
            color="secondary"
          />

          <TextField
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            select
            label="Select Blog Category"
            color="secondary"
          >
            <MenuItem key={1} value="test">
              Test 1
            </MenuItem>
            <MenuItem key={2} value="test2">
              Test 2
            </MenuItem>
          </TextField>

          <MuiFileInput
            value={file}
            onChange={(newFile) => setFile(newFile)}
            color="secondary"
            label="Drag 'n' drop some files here, or click to select files"
          />
          <Button variant="contained" color="secondary">
            Add Blog
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Protected(Blog);
