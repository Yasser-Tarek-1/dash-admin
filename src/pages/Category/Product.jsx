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
import AddIcon from "@mui/icons-material/Add";

const Product = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [sec, setSec] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState(null);

  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        Add Product
      </Typography>
      <form>
        <Stack gap="32px">
          <TextField
            label="Enter Product Name"
            variant="outlined"
            type="text"
            color="secondary"
          />
          <TextField
            variant="outlined"
            placeholder="Enter Product Des"
            multiline
            rows={3}
            rowsMax={6}
            color="secondary"
          />
          <TextField
            label="Enter Product Price"
            variant="outlined"
            type="number"
            color="secondary"
          />
          <TextField
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            select
            label="Select Brand"
            color="secondary"
          >
            <MenuItem key={1} value="test">
              Test 1
            </MenuItem>
            <MenuItem key={2} value="test2">
              Test 2
            </MenuItem>
          </TextField>
          <TextField
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            select
            label="Select Brand"
            color="secondary"
          >
            <MenuItem key={1} value="test">
              Test 1
            </MenuItem>
            <MenuItem key={2} value="test2">
              Test 2
            </MenuItem>
          </TextField>
          <TextField
            value={sec}
            onChange={(e) => setSec(e.target.value)}
            select
            label="Select Brand"
            color="secondary"
          >
            <MenuItem key={1} value="test">
              Test 1
            </MenuItem>
            <MenuItem key={2} value="test2">
              Test 2
            </MenuItem>
          </TextField>
          <TextField
            value={color}
            onChange={(e) => setColor(e.target.value)}
            select
            label="Select Brand"
            color="secondary"
          >
            <MenuItem key={1} value="test">
              Test 1
            </MenuItem>
            <MenuItem key={2} value="test2">
              Test 2
            </MenuItem>
          </TextField>
          <TextField
            label="Enter Product Quantity"
            variant="outlined"
            type="number"
            color="secondary"
          />
          <MuiFileInput
            value={file}
            onChange={(newFile) => setFile(newFile)}
            color="secondary"
            label="Drag 'n' drop some files here, or click to select files"
          />
          <Button variant="contained" color="secondary">
            Add Product
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Product;
