import http from "@/utils/http";

const PREFIX = "analystic";

const analysticApi = {
  async getOverview() {
    return http.post(`${PREFIX}/get-overview`);
  },
};

export default analysticApi;
