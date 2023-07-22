import { Box } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";
import { getCoupons } from "../../features/coupons/couponsSlice";

function createData(id, name, discount, date) {
  return { id, name, discount, date };
}
const headers = ["Name", "Discount", "Expiry", "Action"];

const CouponList = () => {
  const { coupons } = useSelector((state) => state.coupons);
  const [rows, setRow] = useState([]);
  const dispatch = useDispatch();

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
            date
          ),
        ];
      });
    }
  }, [coupons]);

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Coupons" headers={headers} rows={rows} />
    </Box>
  );
};
export default Protected(CouponList);
