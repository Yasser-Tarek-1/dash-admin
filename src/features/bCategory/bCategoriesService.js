import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getBCategory = async () => {
  return await axios.get(`${base_url}blogcategory`, config);
};

const createBCategory = async (bCategory) => {
  return await axios.post(`${base_url}blogcategory`, bCategory, config);
};

const bCategoryService = {
  getBCategory,
  createBCategory,
};

export default bCategoryService;
