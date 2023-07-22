import { Box, IconButton } from "@mui/material";
import Protected from "../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../features/customers/customersSlice";
import CustomTable from "../components/CustomTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(id, name, email, mobile, action) {
  return { id, name, email, mobile, ...action };
}
const headers = ["Name", "Email", "Mobile", "Action"];

const Customers = () => {
  const [rows, setRows] = useState([]);
  const { customers } = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  useEffect(() => {
    setRows([]);
    for (let i = 0; i < customers.length; i++) {
      setRows((prev) => {
        return [
          ...prev,
          createData(
            customers[i]._id,
            `${customers[i].firstname} ${customers[i].lastname}`,
            customers[i].email,
            customers[i].mobile,
            {
              action: (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* <Link to={`/admin/brand/${customers[i]._id}`}> */}
                  <IconButton>
                    <EditIcon color="secondary" />
                  </IconButton>
                  {/* </Link> */}
                  <IconButton
                  // onClick={() =>
                  //   openModalHandler({
                  //     id: customers[i]._id,
                  //     title: customers[i].title,
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
  }, [customers]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable title="Customers" rows={rows} headers={headers} />
    </Box>
  );
};

export default Protected(Customers);
