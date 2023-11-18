/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/utils/http";

const PREFIX = "course";

const TOPIC = "topic";

const UNIT = "unit";

export enum enumCourseStatus {
  PUBLISHED = "published",
  PRIVATE = "private",
}

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

  async getListCourses(filter: {
    limit?: number;
    page?: number;
    order?: {
      key: string;
      value: string;
    };
    query?: {
      key: string;
      value: string;
    }[];
  }) {
    return http.post(`${PREFIX}/get-list`, {
      filter,
    });
  },

  async updateCourse(data: {
    price: number;
    course_id: number;
    description: string;
    status: enumCourseStatus;
  }) {
    return http.post(`${PREFIX}/update`, data);
  },

  async createUnit(data: {
    title: string;
    course_id: number;
    description: string;
    drive_folder_id: string;
  }) {
    return http.post(`${UNIT}/create`, data);
  },

  async deleteCourse(id: number) {
    return http.post(`${PREFIX}/delete/${id}`);
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

  async submitApproval(course_id: number) {
    return http.post(`${PREFIX}/submit-approval`, {
      course_id,
    });
  },

  async getListApproval() {
    return http.post(`${PREFIX}/get-approval-list`);
  },

  async processApproval(id: number, isAccept: boolean) {
    return http.post(`${PREFIX}/process-approval`, {
      id,
      status: isAccept ? "Approved" : "Rejected",
    });
  },

  async enroll(course_id: number) {
    return http.post(`${PREFIX}/enroll`, {
      course_id,
    });
  },

  async getLibrary() {
    return http.post(`${PREFIX}/get-library`);
  },
};

export default courseApi;
