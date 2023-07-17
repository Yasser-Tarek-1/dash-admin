import { Box } from "@mui/material";
import TabelContainer from "../../components/TabelContainer";
import Protected from "../../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { getBrands } from "../../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";

function createData(id, name, createdAt) {
  return { id, name, createdAt };
}
const headers = ["Name", "Created At", "Action"];

const BrandList = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);
  const [rows, setRow] = useState([]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < brands.length; i++) {
      const createdAt = new Date(brands[i]?.createdAt).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
        }
      );
      setRow((prev) => {
        return [...prev, createData(brands[i]._id, brands[i].title, createdAt)];
      });
    }
  }, [brands]);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Brands" headers={headers} rows={rows} />
    </Box>
  );
};
export default Protected(BrandList);
