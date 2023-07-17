import { Box } from "@mui/material";
import Protected from "../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrders } from "../features/orders/ordersSlice";
import CustomTable from "../components/CustomTable";

function createData(id, name, category, brand, quantity, price) {
  return { id, name, category, brand, quantity, price };
}
const headers = ["Name", "Category", "Brand", "Quantity", "Price", "Action"];

const Orders = () => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  // const [rows, setRow] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  console.log(orders);

  // useEffect(() => {
  //setRow([]);
  //   for (let i = 0; i < products.length; i++) {
  //     setRow((prev) => {
  //       return [
  //         ...prev,
  //         createData(
  //           products[i]._id,
  //           products[i].title,
  //           products[i].category,
  //           products[i].brand,
  //           products[i].quantity,
  //           products[i].price
  //         ),
  //       ];
  //     });
  //   }
  // }, [products]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable headers={headers} rows={[]} title={"Orders"} />
    </Box>
  );
};

export default Protected(Orders);
