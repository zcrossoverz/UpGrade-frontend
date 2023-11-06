import http from "@/utils/http";

const PREFIX = "category";

const categoryApi = {
  async getList() {
    return http.post(`${PREFIX}/`);
  },
};

export default categoryApi;
