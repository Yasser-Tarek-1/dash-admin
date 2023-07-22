import { Box, IconButton } from "@mui/material";
import Protected from "../../components/ProtectRoute/Protect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../features/products/productsSlice";
import CustomTable from "../../components/CustomTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(id, name, category, brand, quantity, price, action) {
  return { id, name, category, brand, quantity, price, ...action };
}
const headers = ["Name", "Category", "Brand", "Quantity", "Price", "Action"];

const ProductList = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [rows, setRow] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setRow([]);
    for (let i = 0; i < products.length; i++) {
      setRow((prev) => {
        return [
          ...prev,
          createData(
            products[i]._id,
            products[i].title,
            products[i].category,
            products[i].brand,
            products[i].quantity,
            products[i].price,
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
  }, [products]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <CustomTable headers={headers} rows={rows} title={"Products"} />
    </Box>
  );
};

export default Protected(ProductList);
