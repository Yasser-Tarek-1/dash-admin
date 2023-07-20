import { Box } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";

function createData(id, name, date) {
  return { id, name, date };
}
const headers = ["Name", "Date", "Action"];

const BrandList = () => {
  const { brands } = useSelector((state) => state.brand);
  const [rows, setRow] = useState([]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < brands.length; i++) {
      const date = new Date(brands[i]?.createdAt).toLocaleString();

      setRow((prev) => {
        return [...prev, createData(brands[i]._id, brands[i].title, date)];
      });
    }
  }, [brands]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Brands" headers={headers} rows={rows} />
    </Box>
  );
};
export default Protected(BrandList);
