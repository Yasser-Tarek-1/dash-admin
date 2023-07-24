import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getEnquiries = async () => {
  return await axios.get(`${base_url}enquiry`);
};

const getEnquiry = async (id) => {
  return await axios.get(`${base_url}enquiry/${id}`, config);
};

const updateEnquiry = async ({ id, status }) => {
  return await axios.put(`${base_url}enquiry/${id}`, { status }, config);
};

const deleteEnquiry = async (id) => {
  return await axios.delete(`${base_url}enquiry/${id}`, config);
};

const enquiriesService = {
  getEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
};

export default enquiriesService;
