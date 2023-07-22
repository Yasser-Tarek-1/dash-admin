import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getBCategories = async () => {
  return await axios.get(`${base_url}blogcategory`, config);
};

const createBCategory = async (bCategory) => {
  return await axios.post(`${base_url}blogcategory`, bCategory, config);
};

const getBCategory = async (id) => {
  return await axios.get(`${base_url}blogcategory/${id}`, config);
};

const updateBCategory = async ({ title, id }) => {
  return await axios.put(`${base_url}blogcategory/${id}`, { title }, config);
};

const deleteBCategory = async (id) => {
  return await axios.delete(`${base_url}blogcategory/${id}`, config);
};

const bCategoryService = {
  getBCategories,
  createBCategory,
  getBCategory,
  updateBCategory,
  deleteBCategory,
};

export default bCategoryService;
