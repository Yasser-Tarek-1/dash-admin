import { Box, MenuItem, Select } from "@mui/material";
import Protected from "../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEnquiries } from "../features/enquiries/enquiriesSlice";
import CustomTable from "../components/CustomTable";

function createData(id, name, email, mobile, comment, status) {
  return { id, name, email, mobile, comment, ...status };
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
