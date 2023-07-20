import { Box } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBlogs } from "../../features/blogs/blogsSlice";
import CustomTable from "../../components/CustomTable";

function createData(id, name, category) {
  return { id, name, category };
}
const headers = ["Name", "Category", "Action"];

const BlogList = () => {
  const { blogs, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.blogs
  );
  const [rows, setRow] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < blogs.length; i++) {
      setRow((prev) => {
        return [
          ...prev,
          createData(
            blogs[i]._id,
            blogs[i].title,
            blogs[i].category,
            blogs[i].numViews
          ),
        ];
      });
    }
  }, [blogs]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Blog List" headers={headers} rows={rows} />
    </Box>
  );
};

export default Protected(BlogList);
