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
    id: "color",
    numeric: true,
    disablePadding: false,
    label: "Color",
  },
];

const BrandList = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <TabelContainer rows={[]} headCells={headCells} title={"Brands"} />
    </Box>
  );
};
export default Protected(BrandList);
