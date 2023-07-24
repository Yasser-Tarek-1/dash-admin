import { Box, IconButton, MenuItem, Select } from "@mui/material";
import Protected from "../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getEnquiries,
  deleteEnquiry,
} from "../features/enquiries/enquiriesSlice";
import CustomTable from "../components/CustomTable";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Modal from "../components/Layout/Modal";

function createData(id, name, email, mobile, comment, status, action) {
  return { id, name, email, mobile, comment, status, ...action };
}
const headers = ["Name", "Email", "Mobile", "Comment", "Status", "Action"];

const Enquiries = () => {
  const { enquiries } = useSelector((state) => state.enquiries);
  const [rows, setRow] = useState([]);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({});

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < enquiries.length; i++) {
      setRow((prev) => {
        return [
          ...prev,
          createData(
            enquiries[i]._id,
            enquiries[i].name,
            enquiries[i].email,
            enquiries[i].mobile,
            enquiries[i].comment,
            enquiries[i].status,
            {
              action: (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Link to={`/admin/enquiries/${enquiries[i]._id}`}>
                    <IconButton>
                      <VisibilityIcon color="secondary" />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() =>
                      openModalHandler({
                        id: enquiries[i]._id,
                        title: enquiries[i].name,
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
  }, [enquiries]);

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
    dispatch(deleteEnquiry(deletedItem?.id))
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
        <CustomTable title="Enquiries" headers={headers} rows={rows} />
      </Box>
    </>
  );
};

export default Protected(Enquiries);
