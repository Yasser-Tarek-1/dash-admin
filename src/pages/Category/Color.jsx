import { Box, Button, Stack, Typography } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { useEffect, useState } from "react";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import {
  createColor,
  getColors,
  updateColor,
} from "../../features/color/colorSlice";
import { toast } from "react-hot-toast";
import { useParams, Link, useNavigate } from "react-router-dom";

const Color = () => {
  const { color, message, isError } = useSelector((state) => state.color);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getColors(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      setTitle(color.title);
    }
  }, [id, color]);

  const changeHandler = (newValue) => {
    setTitle(newValue);
    setError(null);
  };

  const submitHandler = () => {
    if (!title) {
      setError("Please Select Color");
    } else {
      if (id && color) {
        // update color
        dispatch(updateColor({ title, id }))
          .unwrap()
          .then(({ title }) => {
            toast.success(`Color ${title} Uupdated successfully`);
            setTitle("");
            setTimeout(() => {
              navigate("/admin/color-list");
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
        dispatch(createColor({ title }))
          .unwrap()
          .then(({ title }) => {
            toast.success(`Color ${title} added successfully`);
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
          <Link style={{ textDecoration: "underline" }} to="/admin/color-list">
            Go Back
          </Link>
        </Box>
      ) : (
        <Box>
          <Typography
            component="h3"
            sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
          >
            {id && color ? "Edit" : "Add"} Color
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
                {id && color ? "Update" : "Add New"} Color
              </Button>
            </Stack>
          </form>
        </Box>
      )}
    </>
  );
};

export default Protected(Color);
