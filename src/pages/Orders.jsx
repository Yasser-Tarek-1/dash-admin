import { Box } from "@mui/material";
import Protected from "../components/ProtectRoute/Protect";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import CustomTable from "../components/CustomTable";

function createData(id, name, product, amount, date) {
  return { id, name, product, amount, date };
}
const headers = ["Name", "Product", "Amount", "Date", "Action"];

const Orders = ({ title }) => {
  const { orders } = useSelector((state) => state.orders);
  const [rows, setRow] = useState([]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < orders.length; i++) {
      const date = new Date(orders[i]?.createdAt).toLocaleString();
      setRow((prev) => {
        return [
          ...prev,
          createData(
            orders[i]._id,
            orders[i].orderby.firstname,
            orders[i].products.map(({ product }, idx) => (
              <li key={idx} style={{ listStyle: "outside" }}>
                {product.title}
              </li>
            )),
            orders[i].paymentIntent.amount,
            date
          ),
        ];
      });
    }
  }, [orders]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable headers={headers} rows={rows} title={title || "Orders"} />
    </Box>
  );
};

export default Protected(Orders);
