import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getColors = async () => {
  return await axios.get(`${base_url}color`, config);
};

const createcolor = async (color) => {
  return await axios.post(`${base_url}color`, color, config);
};

const getColor = async (id) => {
  return await axios.get(`${base_url}color/${id}`, config);
};

const updateColor = async ({ id, title }) => {
  return await axios.put(`${base_url}color/${id}`, { title }, config);
};

const deleteColor = async (id) => {
  return await axios.delete(`${base_url}color/${id}`, config);
};

const colorService = {
  createcolor,
  getColors,
  getColor,
  updateColor,
  deleteColor,
};

export default colorService;
