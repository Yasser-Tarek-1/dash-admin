import { Box } from "@mui/material";
import TabelContainer from "../../components/TabelContainer";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getcolors } from "../../features/color/colorSlice";

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

const ColorList = () => {
  const { colors } = useSelector((state) => state.color);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcolors());
  }, [dispatch]);

  console.log(colors);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <TabelContainer rows={[]} headCells={headCells} title={"Products"} />
    </Box>
  );
};

export default Protected(ColorList);
