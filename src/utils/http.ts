import axios from "axios";
import { getToken, removeToken } from "./authentication";

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
