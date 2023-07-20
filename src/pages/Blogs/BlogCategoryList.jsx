import { Box } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { getbCategory } from "../../features/bCategory/bCategoriesSlice";

function createData(id, name, date) {
  return { id, name, date };
}
const headers = ["Name", "Date", "Action"];

const BlogCategoryList = () => {
  const { bCategories, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.bCategories
  );
  const [rows, setRow] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getbCategory());
  }, [dispatch]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < bCategories.length; i++) {
      const date = new Date(bCategories[i]?.createdAt).toLocaleString();

      setRow((prev) => {
        return [
          ...prev,
          createData(bCategories[i]._id, bCategories[i].title, date),
        ];
      });
    }
  }, [bCategories]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Blog Category List" headers={headers} rows={rows} />
    </Box>
  );
};

export default Protected(BlogCategoryList);
