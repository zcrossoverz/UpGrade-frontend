import http from "@/utils/http";
import { IfilterSearch } from "@/contants/filter";

const PREFIX = "comment";

const commentApi = {
  async create(topic_id: number, text: string, parent_id?: number) {
    return http.post(`${PREFIX}/create`, {
      topic_id,
      text,
      parent_id,
    });
  },
  async update(topic_id: number, text: string) {
    return http.post(`${PREFIX}/update`, {
      id: topic_id,
      text,
    });
  },
  async delete(id: number) {
    return http.post(`${PREFIX}/delete`, {
      id,
    });
  },
  async react(id: number, isLike: boolean) {
    return http.post(`${PREFIX}/react`, {
      id,
      isLike,
    });
  },
  async getList(topic_id: number, filter?: IfilterSearch) {
    return http.post(`${PREFIX}/get-list`, {
      order: {
        key: "id",
        value: "DESC",
      },
      explicit: [
        {
          key: "topic_id",
          value: topic_id,
        },
      ],
      ...filter,
    });
  },
};

export default commentApi;
