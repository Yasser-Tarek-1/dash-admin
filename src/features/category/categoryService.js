import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getCategories = async () => {
  return await axios.get(`${base_url}category`, config);
};

const createCategory = async (category) => {
  return await axios.post(`${base_url}category`, category, config);
};

const getCategory = async (id) => {
  return await axios.get(`${base_url}category/${id}`, config);
};

const updateCategory = async ({ title, id }) => {
  return await axios.put(`${base_url}category/${id}`, { title }, config);
};

const deleteCategory = async (id) => {
  return await axios.delete(`${base_url}category/${id}`, config);
};

const categoryService = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
export default categoryService;
