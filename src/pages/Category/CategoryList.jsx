import { Box, IconButton } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import Modal from "../../components/Layout/Modal";
import { deleteCategory } from "../../features/category/categorySlice";

function createData(id, name, date, action) {
  return { id, name, date, ...action };
}

const headers = ["Name", "Date", "Action"];

const CategoryList = () => {
  const { categories } = useSelector((state) => state.category);
  const [rows, setRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < categories.length; i++) {
      const date = new Date(categories[i]?.createdAt).toLocaleString();

      setRow((prev) => {
        return [
          ...prev,
          createData(categories[i]._id, categories[i].title, date, {
            action: (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link to={`/admin/category/${categories[i]._id}`}>
                  <IconButton>
                    <EditIcon color="secondary" />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={() =>
                    openModalHandler({
                      id: categories[i]._id,
                      title: categories[i].title,
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
  }, [categories]);

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
    dispatch(deleteCategory(deletedItem?.id))
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
        <CustomTable
          title="Products Categories"
          headers={headers}
          rows={rows}
        />
      </Box>
    </>
  );
};
export default Protected(CategoryList);
