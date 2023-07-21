import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { createBrand } from "../../features/brand/brandSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

// I deliberately not use Formik to validate input
const Brand = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setTitle(e.target.value);
    setError(null);
  };

  const submitHandler = () => {
    if (!title) {
      setError("Please Enter Brand Name");
    } else {
      dispatch(createBrand({ title }))
        .unwrap()
        .then(({ title }) => {
          toast.success(`Brand ${title} added successfully`);
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
        Add Brand
      </Typography>
      <form>
        <Stack gap="32px">
          <TextField
            label="Enter Brand Name"
            variant="outlined"
            type="text"
            color="secondary"
            required
            onChange={changeHandler}
            onBlur={() => setError(null)}
            error={error && true}
            helperText={error && error}
            value={title}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "fit-content", fontWeight: 500 }}
            onClick={submitHandler}
          >
            Add New Brand
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Protected(Brand);
