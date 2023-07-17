export const base_url = "http://localhost:5000/api/";

const { token } = JSON.parse(localStorage.getItem("user"));

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};
