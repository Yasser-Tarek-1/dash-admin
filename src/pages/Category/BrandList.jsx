import { Box } from "@mui/material";
import TabelContainer from "../../components/TabelContainer";
import Protected from "../../components/ProtectRoute/Protect";
import { useEffect } from "react";
import { getBrands } from "../../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },

  {
    id: "color",
    numeric: true,
    disablePadding: false,
    label: "Color",
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <TabelContainer rows={[]} headCells={headCells} title={"Brands"} />
    </Box>
  );
};
export default Protected(BrandList);
