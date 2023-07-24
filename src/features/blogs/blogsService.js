import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const getblogs = async () => {
  return await axios.get(`${base_url}blog`, config);
};

const createBlog = async (blog) => {
  return await axios.post(`${base_url}blog`, blog, config);
};

const getBlog = async (id) => {
  return await axios.get(`${base_url}blog/${id}`, config);
};

const updateBlog = async ({ id, ...val }) => {
  return await axios.put(`${base_url}blog/${id}`, val, config);
};

const deleteBlog = async (id) => {
  return await axios.delete(`${base_url}blog/${id}`, config);
};

const blogsService = {
  getblogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
export default blogsService;
