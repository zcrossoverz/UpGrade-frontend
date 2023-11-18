/* eslint-disable @typescript-eslint/no-explicit-any */
import commentApi from "@/apis/comment.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const key = "comment";
const key_get_list = "comments_get_list";

export const useGetComments = (topic_id: number) => {
  const query = useQuery([key, key_get_list], () =>
    commentApi.getList(topic_id)
  );
  return {
    ...query,
    data: query.data?.data?.data,
  };
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: any) => commentApi.create(data.topic_id, data.text, data.parent_id),
    {
      onSuccess: () => {
        toast.success("create comment successfully");
        queryClient.invalidateQueries([key, key_get_list]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );
  return mutation;
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: any) => commentApi.update(data.topic_id, data.text),
    {
      onSuccess: () => {
        toast.success("update comment successfully");
        queryClient.invalidateQueries([key, key_get_list]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );
  return mutation;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data: any) => commentApi.delete(data.id), {
    onSuccess: () => {
      toast.success("delete comment successfully");
      queryClient.invalidateQueries([key, key_get_list]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message);
    },
  });
  return mutation;
};
