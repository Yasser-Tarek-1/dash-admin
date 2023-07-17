export const base_url = "http://localhost:5000/api/";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = user && user.token;

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};
