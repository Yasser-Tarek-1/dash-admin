import axios from "axios";
import { base_url } from "../../common/utils/base_url";

const getProducts = async () => {
  return await axios.get(`${base_url}product/`);
};

const productsService = {
  getProducts,
};

export default productsService;
