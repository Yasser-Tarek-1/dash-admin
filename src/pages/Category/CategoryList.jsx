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

const CategoryList = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <TabelContainer
        rows={[]}
        headCells={headCells}
        title={"Product Categories"}
      />
    </Box>
  );
};

export default Protected(CategoryList);
