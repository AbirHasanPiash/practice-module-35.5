import axios from "axios";

const api = axios.create({
  baseURL: "https://pzafira-cloth-store.vercel.app",
});

// Add token if it exists (optional for reloads)
const token = localStorage.getItem("access");
if (token) {
  api.defaults.headers.common["Authorization"] = `JWT ${token}`;
}

export default api;
