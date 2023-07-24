import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getOrders = async () => {
  return await axios.get(`${base_url}user/getallorders`, config);
};

const getOrderByUserId = async (id) => {
  return await axios.get(`${base_url}user/getorderbyuser/${id}`, config);
};

const ordersService = {
  getOrders,
  getOrderByUserId,
};

export default ordersService;
