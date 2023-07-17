import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const createcolor = async (color) => {
  return await axios.post(`${base_url}color`, color, config);
};

const getcolors = async () => {
  return await axios.get(`${base_url}color`, config);
};

const colorService = {
  createcolor,
  getcolors,
};

export default colorService;
