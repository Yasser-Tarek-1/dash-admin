import { Box, IconButton } from "@mui/material";
import Protected from "../components/ProtectRoute/Protect";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(id, name, product, amount, date, action) {
  return { id, name, product, amount, date, ...action };
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
            date,
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
  }, [orders]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable headers={headers} rows={rows} title={title || "Orders"} />
    </Box>
  );
};

export default Protected(Orders);
