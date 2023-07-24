import { Box, IconButton, Typography } from "@mui/material";
import Protected from "../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import { getOrderByUserId } from "../features/orders/ordersSlice";

function createData(id, name, category, brand, count, price, action) {
  return { id, name, category, brand, count, price, ...action };
}
const headers = [
  "Name",
  "Category",
  "Brand",
  "Quantity",
  "Total Price",
  "Action",
];

const ViewOrder = () => {
  const {
    userOrder = [],
    isError,
    message,
  } = useSelector((state) => state.orders);
  // beacuse i dont have eny order yet => get all orders
  const { products } = userOrder[1] || {};
  const [rows, setRow] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getOrderByUserId(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < products?.length; i++) {
      console.log(products[i]);
      setRow((prev) => {
        return [
          ...prev,
          createData(
            products[i].product._id,
            products[i].product.title,
            products[i].product.category,
            products[i].product.brand,
            products[i].count,
            products[i].product.price * products[i].count,
            {
              action: (
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
  }, [products]);

  return (
    <>
      {id && isError ? (
        <Box>
          <Typography color="error">{message}</Typography>
          <Link style={{ textDecoration: "underline" }} to="/admin/orders">
            Go Back
          </Link>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <CustomTable headers={headers} rows={rows} title={"View Order"} />
        </Box>
      )}
    </>
  );
};

export default Protected(ViewOrder);
