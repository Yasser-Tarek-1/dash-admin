import { Box } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";

function createData(id, name, date) {
  return { id, name, date };
}
const headers = ["Name", "Date", "Action"];

const CategoryList = () => {
  const { categories } = useSelector((state) => state.category);
  const [rows, setRow] = useState([]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < categories.length; i++) {
      const date = new Date(categories[i]?.createdAt).toLocaleString();

      setRow((prev) => {
        return [
          ...prev,
          createData(categories[i]._id, categories[i].title, date),
        ];
      });
    }
  }, [categories]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Products Categories" headers={headers} rows={rows} />
    </Box>
  );
};
export default Protected(CategoryList);
