import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import {
  createBrand,
  getBrand,
  updateBrand,
} from "../../features/brand/brandSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useParams, Link, useNavigate } from "react-router-dom";

// I deliberately not use Formik to validate input
const Brand = () => {
  const { brand, message, isError } = useSelector((state) => state.brand);
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
      dispatch(getBrand(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      setTitle(brand.title);
    }
  }, [id, brand]);

  const submitHandler = () => {
    if (!title) {
      setError("Please Enter Brand Name");
    } else {
      if (id && brand) {
        // update brand
        dispatch(updateBrand({ title, id }))
          .unwrap()
          .then(({ title }) => {
            toast.success(`Brand ${title} Updated successfully`);
            setTitle("");
            setTimeout(() => {
              navigate("/admin/brand-list");
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
        dispatch(createBrand({ title }))
          .unwrap()
          .then(({ title }) => {
            toast.success(`Brand ${title} added successfully`);
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
            {id && brand ? "Edit" : "Add"} Brand
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
                {id && brand ? "Update" : "Add New"} Brand
              </Button>
            </Stack>
          </form>
        </Box>
      )}
    </>
  );
};

export default Protected(Brand);
