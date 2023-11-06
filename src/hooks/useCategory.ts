import categoryApi from "@/apis/category.api";

import { useQuery } from "@tanstack/react-query";

const key = "category";

export const useGetListCategories = () => {
  const query = useQuery([key], categoryApi.getList);
  return {
    ...query,
    data: query.data?.data?.data,
  };
};
