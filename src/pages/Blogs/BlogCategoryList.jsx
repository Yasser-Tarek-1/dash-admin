import { Box } from "@mui/material";
import TabelContainer from "../../components/TabelContainer";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },

  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

const BlogCategoryList = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <TabelContainer
        rows={[]}
        headCells={headCells}
        title={"Blog Categories"}
      />
    </Box>
  );
};

export default BlogCategoryList;
