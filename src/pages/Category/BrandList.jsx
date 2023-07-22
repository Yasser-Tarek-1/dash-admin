import { Box, IconButton, Stack } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../../components/Layout/Modal";
import { deleteBrand } from "../../features/brand/brandSlice";
import { toast } from "react-hot-toast";

function createData(id, name, date, action) {
  return { id, name, date, ...action };
}
const headers = ["Name", "Date", "Action"];

const BrandList = () => {
  const { brands } = useSelector((state) => state.brand);
  const [rows, setRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < brands.length; i++) {
      const date = new Date(brands[i]?.createdAt).toLocaleString();

      setRow((prev) => {
        return [
          ...prev,
          createData(brands[i]._id, brands[i].title, date, {
            action: (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link to={`/admin/brand/${brands[i]._id}`}>
                  <IconButton>
                    <EditIcon color="secondary" />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={() =>
                    openModalHandler({
                      id: brands[i]._id,
                      title: brands[i].title,
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
  }, [brands]);

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
    dispatch(deleteBrand(deletedItem?.id))
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
        <CustomTable title="Brands" headers={headers} rows={rows} />
      </Box>
    </>
  );
};
export default Protected(BrandList);
