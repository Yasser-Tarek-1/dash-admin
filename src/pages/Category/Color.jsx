import { Box, Button, Stack, Typography } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { useState } from "react";

const Color = () => {
  const [value, setValue] = useState("#ffffff");
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
      >
        Add Color
      </Typography>
      <form>
        <Stack gap="32px">
          <MuiColorInput
            value={value}
            onChange={handleChange}
            color="secondary"
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "fit-content", fontWeight: 500 }}
          >
            Add New Color
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Color;
