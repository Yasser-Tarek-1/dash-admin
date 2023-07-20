import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getbCategory = async () => {
  return await axios.get(`${base_url}blogcategory`, config);
};

const bCategoryService = {
  getbCategory,
};

export default bCategoryService;
