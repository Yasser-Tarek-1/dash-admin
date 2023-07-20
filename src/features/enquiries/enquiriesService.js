import axios from "axios";
import { base_url } from "../../common/utils/base_url";

const getEnquiries = async () => {
  return await axios.get(`${base_url}enquiry`);
};

const enquiriesService = {
  getEnquiries,
};

export default enquiriesService;
