import axios from "axios";
import { getToken, removeToken, setToken } from "./authentication";

const http = axios.create({
  baseURL: "http://localhost:3000",
});

http.interceptors.request.use((request) => {
  if (getToken()) {
    request.headers.Authorization = `Bearer ${getToken()}`;
  }
  return request;
});

http.interceptors.response.use(
  (response) => {
    if (response.config.url === "/auth/login" && response.data.data.id_token) {
      setToken(response.data.data.id_token);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
    }
    throw error;
  }
);

export default http;
