import http from "@/utils/http";

const PREFIX = "note";

const noteApi = {
  async create(topic_id: number, time: number, comment: string) {
    return http.post(`${PREFIX}/create`, {
      topic_id,
      time,
      comment,
    });
  },
  async delete(id: number) {
    return http.post(`${PREFIX}/delete`, {
      id,
    });
  },
  async getList(topic_id: number) {
    return http.post(`${PREFIX}/get-list-by-topic`, {
      topic_id,
    });
  },
};

export default noteApi;
