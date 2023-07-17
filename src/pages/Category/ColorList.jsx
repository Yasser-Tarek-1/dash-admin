import { Box } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { getcolors } from "../../features/color/colorSlice";
import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";

function createData(id, name, createdAt) {
  return { id, name, createdAt };
}
const headers = ["Name", "Created At", "Action"];

const ColorList = () => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.color);
  const [rows, setRow] = useState([]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < colors.length; i++) {
      const createdAt = new Date(colors[i]?.createdAt).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
        }
      );
      setRow((prev) => {
        return [...prev, createData(colors[i]._id, colors[i].title, createdAt)];
      });
    }
  }, [colors]);

  useEffect(() => {
    dispatch(getcolors());
  }, [dispatch]);

  console.log(rows);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Colors" headers={headers} rows={rows} />
    </Box>
  );
};
export default Protected(ColorList);
