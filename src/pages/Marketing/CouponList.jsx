import { Box } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";

function createData(id, name, createdAt) {
  return { id, name, createdAt };
}
const headers = ["Name", "Created At", "Action"];

const CouponList = () => {
  // const dispatch = useDispatch();
  // const { coupons } = useSelector((state) => state.Coupons);
  // const [rows, setRow] = useState([]);

  // useEffect(() => {
  //   setRow([]);
  //   for (let i = 0; i < coupons.length; i++) {
  //     const createdAt = new Date(coupons[i]?.createdAt).toLocaleDateString(
  //       "en-US",
  //       {
  //         weekday: "long",
  //       }
  //     );
  //     setRow((prev) => {
  //       return [...prev, createData(coupons[i]._id, coupons[i].title, createdAt)];
  //     });
  //   }
  // }, [coupons]);

  // useEffect(() => {
  //   dispatch(getCoupons());
  // }, [dispatch]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Coupons" headers={headers} rows={[]} />
    </Box>
  );
};
export default Protected(CouponList);
