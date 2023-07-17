import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const createCategory = async (category) => {
  return await axios.post(`${base_url}category`, category, config);
};

const getCategories = async () => {
  return await axios.get(`${base_url}category`, config);
};

const categoryService = {
  createCategory,
  getCategories,
};
export default categoryService;
