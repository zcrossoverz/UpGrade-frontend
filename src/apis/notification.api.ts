import http from "@/utils/http";

const PREFIX = "notify";

const notificationApi = {
  async getUnreadList() {
    return http.post(`${PREFIX}/get-unread`);
  },
  async markReadAll() {
    return http.post(`${PREFIX}/mark-read`);
  },
  async markRead(id?: number) {
    return http.post(`${PREFIX}/mark-read`, {
      id,
    });
  },
};

export default notificationApi;
