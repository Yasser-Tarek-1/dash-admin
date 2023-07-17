import axios from "axios";
import { base_url } from "../../common/utils/base_url";

const login = async (userData) => {
  return await axios.post(`${base_url}user/admin-login`, userData);
};

const authService = {
  login,
};
export default authService;
