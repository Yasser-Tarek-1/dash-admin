import { Box } from "@mui/material";
import TabelContainer from "../../components/TabelContainer";
import Protected from "../../components/ProtectRoute/Protect";

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  {
    id: "brand",
    numeric: true,
    disablePadding: false,
    label: "Brand",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "color",
    numeric: true,
    disablePadding: false,
    label: "Color",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

const ProductList = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <TabelContainer rows={[]} headCells={headCells} title={"Products"} />
    </Box>
  );
};

export default Protected(ProductList);
