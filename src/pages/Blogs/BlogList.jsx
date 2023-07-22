import { Box, IconButton } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBlogs } from "../../features/blogs/blogsSlice";
import CustomTable from "../../components/CustomTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(id, name, category, numViews, action) {
  return { id, name, category, numViews, ...action };
}
const headers = ["Name", "Category", "Action"];

const BlogList = () => {
  const { blogs } = useSelector((state) => state.blogs);
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
            blogs[i].numViews,
            {
              action: (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* <Link to={`/admin/product/${products[i]._id}`}> */}
                  <IconButton>
                    <EditIcon color="secondary" />
                  </IconButton>
                  {/* </Link> */}
                  <IconButton
                  // onClick={() =>
                  //   openModalHandler({
                  //     id: products[i]._id,
                  //     title: products[i].title,
                  //   })
                  // }
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              ),
            }
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
