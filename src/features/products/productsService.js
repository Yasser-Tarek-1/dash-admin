import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getProducts = async () => {
  return await axios.get(`${base_url}product/`);
};

const createProduct = async (product) => {
  return await axios.post(`${base_url}product/`, product, config);
};

const getProduct = async (id) => {
  return await axios.get(`${base_url}product/${id}`, config);
};

const updateProduct = async ({ id, ...product }) => {
  return await axios.put(`${base_url}product/${id}`, product, config);
};

const deleteProduct = async (id) => {
  return await axios.delete(`${base_url}product/${id}`, config);
};

const productsService = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

export default productsService;
