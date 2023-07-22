import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getblogs = async () => {
  return await axios.get(`${base_url}blog`, config);
};

const createBlog = async (blog) => {
  return await axios.post(`${base_url}blog`, blog, config);
};

const blogsService = {
  getblogs,
  createBlog,
};
export default blogsService;
