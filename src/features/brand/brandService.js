import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getBrands = async () => {
  return await axios.get(`${base_url}brand`, config);
};

const createBrand = async (brand) => {
  return await axios.post(`${base_url}brand`, brand, config);
};

const getBrand = async (id) => {
  return await axios.get(`${base_url}brand/${id}`, config);
};

const updateBrand = async ({ title, id }) => {
  return await axios.put(`${base_url}brand/${id}`, { title }, config);
};

const deleteBrand = async (id) => {
  return await axios.delete(`${base_url}brand/${id}`, config);
};

const brandService = {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
