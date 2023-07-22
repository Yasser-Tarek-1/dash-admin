import { Box, IconButton } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";
import { getCoupons, deleteCoupon } from "../../features/coupons/couponsSlice";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import Modal from "../../components/Layout/Modal";

function createData(id, name, discount, date, action) {
  return { id, name, discount, date, ...action };
}
const headers = ["Name", "Discount", "Expiry", "Action"];

const CouponList = () => {
  const { coupons } = useSelector((state) => state.coupons);
  const [rows, setRow] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({});

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < coupons.length; i++) {
      const date = new Date(coupons[i]?.expiry).toLocaleString();

      setRow((prev) => {
        return [
          ...prev,
          createData(
            coupons[i]._id,
            coupons[i].name,
            coupons[i].discount,
            date,
            {
              action: (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Link to={`/admin/coupon/${coupons[i]._id}`}>
                    <IconButton>
                      <EditIcon color="secondary" />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() =>
                      openModalHandler({
                        id: coupons[i]._id,
                        title: coupons[i].name,
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
  }, [coupons]);

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
    dispatch(deleteCoupon(deletedItem?.id))
      .unwrap()
      .then(() => {
        toast.success(`${deletedItem?.title} Deleted successfully`);
      })
      .catch(() => {
        toast.error("Network Error!");
      });
  };

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  return (
    <>
      <Modal
        open={open}
        onCloseHandler={onCloseHandler}
        title={deletedItem?.title}
        onDeleteHandler={onDeleteHandler}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <CustomTable title="Coupons" headers={headers} rows={rows} />
      </Box>
    </>
  );
};
export default Protected(CouponList);
