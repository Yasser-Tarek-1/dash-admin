import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getOrders = async () => {
  return await axios.get(`${base_url}user/getallorders`, config);
};

const ordersService = {
  getOrders,
};

export default ordersService;
