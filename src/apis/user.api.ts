import http from "@/utils/http";

const PREFIX = "user";

const userApi = {
  async register(email: string, password: string) {
    return http.post(`${PREFIX}/create`, {
      email,
      password,
    });
  },
  async getUsers() {
    return http.get(`${PREFIX}/getList`);
  },
};

export default userApi;
