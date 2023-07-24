import { Box, IconButton } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../../features/blogs/blogsSlice";
import CustomTable from "../../components/CustomTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Modal from "../../components/Layout/Modal";

function createData(id, name, category, numViews, action) {
  return { id, name, category, numViews, ...action };
}
const headers = ["Name", "Category", "Action"];

const BlogList = () => {
  const { blogs } = useSelector((state) => state.blogs);
  const [rows, setRow] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({});

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < blogs.length; i++) {
      setRow((prev) => {
        return [
          ...prev,
          createData(
            blogs[i]._id,
            blogs[i].title,
            blogs[i].category,
            blogs[i].numViews,
            {
              action: (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Link to={`/admin/blog/${blogs[i]._id}`}>
                    <IconButton>
                      <EditIcon color="secondary" />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() =>
                      openModalHandler({
                        id: blogs[i]._id,
                        title: blogs[i].title,
                      })
                    }
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              ),
            }
          ),
        ];
      });
    }
  }, [blogs]);

  // delete handler
  const openModalHandler = (data) => {
    setOpen(true);
    setDeletedItem(data);
  };

  const onCloseHandler = () => {
    setOpen(false);
  };

  const onDeleteHandler = () => {
    setOpen(false);
    dispatch(deleteBlog(deletedItem?.id))
      .unwrap()
      .then(() => {
        toast.success(`${deletedItem?.title} Deleted successfully`);
      })
      .catch(() => {
        toast.error("Network Error!");
      });
  };

  return (
    <>
      <Modal
        open={open}
        onCloseHandler={onCloseHandler}
        title={deletedItem?.title}
        onDeleteHandler={onDeleteHandler}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <CustomTable title="Blog List" headers={headers} rows={rows} />
      </Box>
    </>
  );
};

export default Protected(BlogList);
