import { Box } from "@mui/material";
import TabelContainer from "../../components/TabelContainer";
import Protected from "../../components/ProtectRoute/Protect";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "discount",
    numeric: true,
    disablePadding: false,
    label: "Discount",
  },
  {
    id: "expiry",
    numeric: true,
    disablePadding: false,
    label: "Expiry",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

const CouponList = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <TabelContainer rows={[]} headCells={headCells} title={"Coupons"} />
    </Box>
  );
};

export default Protected(CouponList);
