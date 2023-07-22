import { Box, IconButton } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { Link } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteColor } from "../../features/color/colorSlice";
import Modal from "../../components/Layout/Modal";
import { toast } from "react-hot-toast";

function createData(id, name, date, action) {
  return { id, name, date, ...action };
}
const headers = ["Name", "Date", "Action"];

const ColorList = () => {
  const { colors } = useSelector((state) => state.color);
  const [rows, setRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < colors.length; i++) {
      const date = new Date(colors[i]?.createdAt).toLocaleString();

      setRow((prev) => {
        return [
          ...prev,
          createData(colors[i]._id, colors[i].title, date, {
            action: (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link to={`/admin/color/${colors[i]._id}`}>
                  <IconButton>
                    <EditIcon color="secondary" />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={() =>
                    openModalHandler({
                      id: colors[i]._id,
                      title: colors[i].title,
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
  }, [colors]);

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
    dispatch(deleteColor(deletedItem?.id))
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
        <CustomTable title="Colors" headers={headers} rows={rows} />
      </Box>
    </>
  );
};
export default Protected(ColorList);
