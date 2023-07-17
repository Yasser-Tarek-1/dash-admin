import { Box, Button, Stack, Typography } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { useState } from "react";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch } from "react-redux";
import { createColor } from "../../features/color/colorSlice";
import { toast } from "react-toastify";

const Color = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const changeHandler = (newValue) => {
    setTitle(newValue);
    setError(null);
  };

  const submitHandler = () => {
    if (!title) {
      setError("Please Select Color");
    } else {
      dispatch(createColor({ title }))
        .unwrap()
        .then(({ title }) => {
          toast.success(`Color ${title} added successfully`);
          setTitle("");
        })
        .catch((err) => {
          if (err == "Request failed with status code 500") {
            return toast.error(`${title} already exists`);
          }
          return toast.error(`${err}`);
        });
    }
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
            value={title}
            onChange={changeHandler}
            onBlur={() => setError(null)}
            error={error && true}
            helperText={error && error}
            color="secondary"
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "fit-content", fontWeight: 500 }}
            onClick={submitHandler}
          >
            Add New Color
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Protected(Color);
