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

  async getListTopics(unit_id: number) {
    return http.post(`${TOPIC}/get-list-topic/`, {
      unit_id,
    });
  },

  async createTopic(data: any) {
    return http.post(`${TOPIC}/create`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async updateTopic(data: {
    topic_id: number;
    title: string;
    description: string;
  }) {
    return http.post(`${TOPIC}/update`, data);
  },

  async deleteTopic(topic_id: number) {
    return http.post(`${TOPIC}/delete/${topic_id}`);
  },

  async getTopic(id: number) {
    return http.post(`${TOPIC}/get/${id}`);
  },
};

export default courseApi;
