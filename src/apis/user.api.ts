/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/utils/http";

const PREFIX = "user";

const userApi = {
  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return http.post(`${PREFIX}/create`, {
      email,
      password,
      firstName,
      lastName,
    });
  },
  async getListUsers(filter: any) {
    return http.post(`${PREFIX}/get-list`, {
      ...filter,
    });
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
