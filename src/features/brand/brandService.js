import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const createBrand = async (brand) => {
  return await axios.post(`${base_url}brand`, brand, config);
};

const getBrands = async () => {
  return await axios.get(`${base_url}brand`, config);
};

const brandService = {
  createBrand,
  getBrands,
};
export default brandService;
