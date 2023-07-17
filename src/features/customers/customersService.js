import axios from "axios";
import { base_url } from "../../common/utils/base_url";

const getCustomers = async () => {
  return await axios.get(`${base_url}user/all-users`);
};

const customersService = {
  getCustomers,
};

export default customersService;
