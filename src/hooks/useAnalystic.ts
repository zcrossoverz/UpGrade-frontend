import analysticApi from "@/apis/analystic.api";
import { useQuery } from "@tanstack/react-query";

const key = "analytics";
const key_get_overview = "analytics_get_overview";

export const useGetOverview = () => {
  const query = useQuery([key, key_get_overview], () =>
    analysticApi.getOverview()
  );

  return {
    ...query,
    data: query.data?.data?.data,
  };
};
