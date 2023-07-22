import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../features/category/categorySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

// I deliberately not use Formik to validate input
const Category = () => {
  const { category, message, isError } = useSelector((state) => state.category);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setTitle(e.target.value);
    setError(null);
  };

  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      setTitle(category.title);
    }
  }, [id, category]);

  const submitHandler = () => {
    if (!title) {
      setError("Please Enter Category Name");
    } else {
      if (id && category) {
        // update Category
        dispatch(updateCategory({ title, id }))
          .unwrap()
          .then(({ title }) => {
            toast.success(`Category ${title} Uupdated successfully`);
            setTitle("");
            setTimeout(() => {
              navigate("/admin/category-list");
            }, 1000);
          })
          .catch((err) => {
            if (err?.includes("E11000 duplicate key error collection")) {
              toast.error(`${title} already exists`);
            } else {
              toast.error(`${err}`);
            }
          });
      } else {
        // add new Category
        dispatch(createCategory({ title }))
          .unwrap()
          .then(({ title }) => {
            toast.success(`Category ${title} added successfully`);
            setTitle("");
          })
          .catch((err) => {
            if (err?.includes("E11000 duplicate key error collection")) {
              return toast.error(`${title} already exists`);
            }
            return toast.error(`${err}`);
          });
      }
    }
  };

  return (
    <>
      {id && isError ? (
        <Box>
          <Typography color="error">{message}</Typography>
          <Link
            style={{ textDecoration: "underline" }}
            to="/admin/category-list"
          >
            Go Back
          </Link>
        </Box>
      ) : (
        <Box>
          <Typography
            component="h3"
            sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
          >
            {id && category ? "Edit" : "Add"} Category
          </Typography>
          <form>
            <Stack gap="32px">
              <TextField
                label="Enter Category Name"
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
                {id && category ? "Update" : "Add New"} Category
              </Button>
            </Stack>
          </form>
        </Box>
      )}
    </>
  );
};

export default Protected(Category);
