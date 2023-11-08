/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/utils/http";

const PREFIX = "course";

const TOPIC = "topic";

const UNIT = "unit";

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

  async createUnit(data: {
    title: string;
    course_id: number;
    description: string;
  }) {
    return http.post(`${UNIT}/create`, data);
  },

  async updateUnit(data: {
    title: string;
    unit_id: number;
    description: string;
  }) {
    return http.post(`${UNIT}/update`, data);
  },

  async deleteUnit(unit_id: number) {
    return http.post(`${UNIT}/delete/${unit_id}`);
  },
};

export default courseApi;
