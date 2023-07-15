import { Box } from "@mui/material";
import TabelContainer from "../components/TabelContainer";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "mobile",
    numeric: true,
    disablePadding: false,
    label: "Mobile",
  },
];

const Customers = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <TabelContainer rows={[]} headCells={headCells} title={"Customers"} />
    </Box>
  );
};

export default Customers;
