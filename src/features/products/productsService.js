import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getProducts = async () => {
  return await axios.get(`${base_url}product/`);
};

const createProduct = async (product) => {
  return await axios.post(`${base_url}product/`, product, config);
};

const productsService = {
  getProducts,
  createProduct,
};

export default productsService;
