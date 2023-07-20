import { Box } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";

function createData(id, name, date) {
  return { id, name, date };
}
const headers = ["Name", "Date", "Action"];

const ColorList = () => {
  const { colors } = useSelector((state) => state.color);
  const [rows, setRow] = useState([]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < colors.length; i++) {
      const date = new Date(colors[i]?.createdAt).toLocaleString();

      setRow((prev) => {
        return [...prev, createData(colors[i]._id, colors[i].title, date)];
      });
    }
  }, [colors]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Colors" headers={headers} rows={rows} />
    </Box>
  );
};
export default Protected(ColorList);
