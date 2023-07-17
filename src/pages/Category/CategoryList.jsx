import { Box } from "@mui/material";
import TabelContainer from "../../components/TabelContainer";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../features/category/categorySlice";

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
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
