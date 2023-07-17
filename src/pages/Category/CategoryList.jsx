import { Box } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { getCategories } from "../../features/category/categorySlice.js";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";

function createData(id, name, createdAt) {
  return { id, name, createdAt };
}
const headers = ["Name", "Created At", "Action"];

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [rows, setRow] = useState([]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < categories.length; i++) {
      const createdAt = new Date(categories[i]?.createdAt).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
        }
      );
      setRow((prev) => {
        return [
          ...prev,
          createData(categories[i]._id, categories[i].title, createdAt),
        ];
      });
    }
  }, [categories]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Products Categories" headers={headers} rows={rows} />
    </Box>
  );
};
export default Protected(CategoryList);
