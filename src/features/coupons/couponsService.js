import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const createCoupon = async () => {
  return await axios.post(`${base_url}coupon`, config);
};

const couponsService = {
  createCoupon,
};

export default couponsService;
