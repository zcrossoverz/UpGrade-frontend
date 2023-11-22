import http from "@/utils/http";

const PREFIX = "category";

const categoryApi = {
  async getList() {
    return http.post(`${PREFIX}/`);
  },
  async getAnalyst() {
    return http.post(`${PREFIX}/analyst`);
  },
};

export default categoryApi;
