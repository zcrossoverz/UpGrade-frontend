/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/utils/http";

const PREFIX = "course";

const TOPIC = "topic";

const courseApi = {
  async getCourseDetail(id: number) {
    return http.get(`${PREFIX}/${id}`);
  },

  async createCourse(data: any) {
    return http.post(`${PREFIX}/create`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async getMyCourses() {
    return http.post(`${PREFIX}/get-my-courses`);
  },

  async getTopic(id: number) {
    return http.post(`${TOPIC}/get/${id}`);
  },
};

export default courseApi;
