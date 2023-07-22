import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getCoupons = async () => {
  return await axios.get(`${base_url}coupon`, config);
};

const createCoupon = async (coupon) => {
  return await axios.post(`${base_url}coupon`, coupon, config);
};

const getCoupon = async (id) => {
  return await axios.get(`${base_url}coupon/${id}`, config);
};

const updateCoupon = async ({ id, ...val }) => {
  return await axios.put(`${base_url}coupon/${id}`, val, config);
};

const deleteCoupon = async (id) => {
  return await axios.delete(`${base_url}coupon/${id}`, config);
};

const couponsService = {
  getCoupons,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponsService;
