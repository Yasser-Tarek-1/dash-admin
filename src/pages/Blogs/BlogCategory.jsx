import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  createBCategory,
  getBCategory,
  updateBCategory,
} from "../../features/bCategory/bCategoriesSlice";
import { useParams, Link, useNavigate } from "react-router-dom";

// I deliberately not use Formik to validate input
const BlogCategory = () => {
  const { bCategory, message, isError } = useSelector(
    (state) => state.bCategories
  );
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
    if (id) {
      dispatch(getBCategory(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      setTitle(bCategory.title);
    }
  }, [id, bCategory]);

  const submitHandler = () => {
    if (!title) {
      setError("Please Enter Blog Category Name");
    } else {
      if (id && bCategory) {
        // update brand
        dispatch(updateBCategory({ title, id }))
          .unwrap()
          .then(({ title }) => {
            toast.success(`${title} Updated successfully`);
            setTitle("");
            setTimeout(() => {
              navigate("/admin/blog-category-list");
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
        // add new brand
        dispatch(createBCategory({ title }))
          .unwrap()
          .then(({ title }) => {
            toast.success(`${title} added successfully`);
            setTitle("");
          })
          .catch((err) => {
            if (err?.includes("E11000 duplicate key error collection")) {
              toast.error(`${title} already exists`);
            } else {
              toast.error(`${err}`);
            }
          });
      }
    }
  };

  return (
    <>
      {id && isError ? (
        <Box>
          <Typography color="error">{message}</Typography>
          <Link style={{ textDecoration: "underline" }} to="/admin/brand-list">
            Go Back
          </Link>
        </Box>
      ) : (
        <Box>
          <Typography
            component="h3"
            sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
          >
            {id && bCategory ? "Edit" : "Add"} Blog Category
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
                {id && bCategory ? "Update" : "Add New"} Blog Category
              </Button>
            </Stack>
          </form>
        </Box>
      )}
    </>
  );
};

export default Protected(BlogCategory);
