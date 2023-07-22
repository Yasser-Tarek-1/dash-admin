import { Box, IconButton, MenuItem, Select } from "@mui/material";
import Protected from "../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEnquiries } from "../features/enquiries/enquiriesSlice";
import CustomTable from "../components/CustomTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(id, name, email, mobile, comment, status, action) {
  return { id, name, email, mobile, comment, ...status, ...action };
}
const headers = ["Name", "Email", "Mobile", "Comment", "Status", "Action"];

const Enquiries = () => {
  const { enquiries, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.enquiries
  );
  const [rows, setRow] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < enquiries.length; i++) {
      setRow((prev) => {
        return [
          ...prev,
          createData(
            enquiries[i]._id,
            enquiries[i].name,
            enquiries[i].email,
            enquiries[i].mobile,
            enquiries[i].comment,
            {
              status: (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={enquiries[i].status}
                >
                  <MenuItem value={enquiries[i].status}>
                    {enquiries[i].status}
                  </MenuItem>
                </Select>
              ),
            },
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
  }, [enquiries]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Enquiries" headers={headers} rows={rows} />
    </Box>
  );
};

export default Protected(Enquiries);
