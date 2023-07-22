import { Box, IconButton } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import {
  getBCategories,
  deleteBCategory,
} from "../../features/bCategory/bCategoriesSlice";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../../components/Layout/Modal";
import { toast } from "react-hot-toast";

function createData(id, name, date, action) {
  return { id, name, date, ...action };
}
const headers = ["Name", "Date", "Action"];

const BlogCategoryList = () => {
  const { bCategories } = useSelector((state) => state.bCategories);
  const [rows, setRow] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({});

  useEffect(() => {
    dispatch(getBCategories());
  }, [dispatch]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < bCategories.length; i++) {
      const date = new Date(bCategories[i]?.createdAt).toLocaleString();

      setRow((prev) => {
        return [
          ...prev,
          createData(bCategories[i]._id, bCategories[i].title, date, {
            action: (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link to={`/admin/blog-category/${bCategories[i]._id}`}>
                  <IconButton>
                    <EditIcon color="secondary" />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={() =>
                    openModalHandler({
                      id: bCategories[i]._id,
                      title: bCategories[i].title,
                    })
                  }
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            ),
          }),
        ];
      });
    }
  }, [bCategories]);

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
    dispatch(deleteBCategory(deletedItem?.id))
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
        <CustomTable title="Blog Category List" headers={headers} rows={rows} />
      </Box>
    </>
  );
};

export default Protected(BlogCategoryList);
