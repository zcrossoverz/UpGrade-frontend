/* eslint-disable @typescript-eslint/no-explicit-any */
import reviewApi from "@/apis/review.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const key = "reviews";
const key_get_list = "reviews_get_list";

export const useGetReviews = (course_id: number, user_id: number) => {
  const query = useQuery([key, key_get_list, course_id], () =>
    reviewApi.getList(course_id)
  );
  const isAlreadyReview = query.data?.data?.data?.datas?.some(
    ({ reviewer_id }: { reviewer_id: number }) => reviewer_id === user_id
  );
  return {
    ...query,
    data: query.data?.data?.data,
    isAlreadyReview,
  };
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: any) =>
      reviewApi.createReview(data.course_id, data.rate, data.comment),
    {
      onSuccess: () => {
        toast.success("create review successfully");
        queryClient.invalidateQueries([key, key_get_list]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );
  return mutation;
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: any) => reviewApi.updateReview(data.id, data.rate, data.comment),
    {
      onSuccess: () => {
        toast.success("update review successfully");
        queryClient.invalidateQueries([key, key_get_list]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );
  return mutation;
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data: any) => reviewApi.deleteReview(data.id), {
    onSuccess: () => {
      toast.success("delete review successfully");
      queryClient.invalidateQueries([key, key_get_list]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message);
    },
  });
  return mutation;
};
