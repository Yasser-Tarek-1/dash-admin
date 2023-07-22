import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getCoupons = async () => {
  return await axios.get(`${base_url}coupon`, config);
};

const createCoupon = async (coupon) => {
  return await axios.post(`${base_url}coupon`, coupon, config);
};

const couponsService = { getCoupons, createCoupon };

export default couponsService;
