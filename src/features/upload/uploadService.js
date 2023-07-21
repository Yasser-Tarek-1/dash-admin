import axios from "axios";
import { base_url, config } from "../../common/utils/base_url";

const uploadImage = async (formData) => {
  return await axios.post(`${base_url}upload/`, formData, config);
};
const deleteImage = async (id) => {
  return await axios.delete(`${base_url}upload/delete-img/${id}`, config);
};

const uploadService = {
  uploadImage,
  deleteImage,
};

export default uploadService;
