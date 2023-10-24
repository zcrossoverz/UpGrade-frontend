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
  async updateUser(dataUpdate: {
    firstName?: string;
    lastName?: string;
    password?: string;
    bio?: string;
    email?: string;
  }) {
    return http.put(`${PREFIX}`, dataUpdate);
  },
};

export default userApi;
