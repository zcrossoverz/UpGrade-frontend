import http from "@/utils/http";

const PREFIX = "review";

const reviewApi = {
  async createReview(course_id: number, rate: number, comment: string) {
    return http.post(`${PREFIX}/create`, {
      course_id,
      rate,
      comment,
    });
  },
  async updateReview(id: number, rate: number, comment: string) {
    return http.post(`${PREFIX}/update`, {
      id,
      rate,
      comment,
    });
  },
  async deleteReview(id: number) {
    return http.post(`${PREFIX}/delete`, {
      id,
    });
  },
  async getList(course_id: number) {
    return http.post(`${PREFIX}/get-list`, {
      explicit: [
        {
          key: "course_id",
          value: course_id,
        },
      ],
      order: {
        key: "id",
        value: "DESC",
      },
    });
  },
};

export default reviewApi;
