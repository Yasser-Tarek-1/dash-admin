import { Box } from "@mui/material";
import Protected from "../components/ProtectRoute/Protect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../features/customers/customersSlice";
import CustomTable from "../components/CustomTable";

function createData(id, name, email, mobile) {
  return { id, name, email, mobile };
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
    for (let i = 0; i < customers.length; i++) {
      setRows((prev) => {
        return [
          ...prev,
          createData(
            customers[i]._id,
            `${customers[i].firstname} ${customers[i].lastname}`,
            customers[i].email,
            customers[i].mobile
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
