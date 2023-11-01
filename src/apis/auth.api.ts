import http from "@/utils/http";

const PREFIX = "auth";

const authApi = {
  async validateToken() {
    return http.post(`${PREFIX}/validateToken`, {});
  },
  async login(email: string, password: string) {
    return http.post(`${PREFIX}/login`, {
      email,
      password,
    });
  },
  async logout() {
    return http.post(`${PREFIX}/revokeToken`, {});
  },
  async refreshToken() {
    return http.post(`${PREFIX}/refreshToken`, {});
  },
};

export default authApi;
