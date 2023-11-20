/* eslint-disable @typescript-eslint/no-explicit-any */
export const PUBLIC_FILTER = {
  key: "status",
  value: "published",
};

export interface IfilterSearch {
  limit?: number;
  page?: number;
  order?: {
    key: string;
    value: string;
  };
  query?: {
    key: string;
    value: any;
  }[];
  exclude?: {
    key: string;
    value: any;
  }[];
  explicit?: {
    key: string;
    value: any;
  }[];
}
