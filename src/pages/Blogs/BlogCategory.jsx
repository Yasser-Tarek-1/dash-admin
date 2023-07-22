import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createBCategory } from "../../features/bCategory/bCategoriesSlice";

// I deliberately not use Formik to validate input
const BlogCategory = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setTitle(e.target.value);
    setError(null);
  };

  const submitHandler = () => {
    if (!title) {
      setError("Please Enter Blog Category Name");
    } else {
      dispatch(createBCategory({ title }))
        .unwrap()
        .then(({ title }) => {
          console.log(title);
          toast.success(`${title} added successfully`);
          setTitle("");
        })
        .catch((err) => {
          if (err?.includes("E11000 duplicate key error collection")) {
            return toast.error(`${title} already exists`);
          } else {
            toast.error(err);
          }
        });
    }
  };

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
            Add New Blog Category
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Protected(BlogCategory);
