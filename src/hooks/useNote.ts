/* eslint-disable @typescript-eslint/no-explicit-any */
import noteApi from "@/apis/note.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const key = "notes";
const key_get_list = "note_get_list";

export const useGetNotes = (topic_id: number) => {
  const query = useQuery([key, key_get_list], () => noteApi.getList(topic_id));

  return {
    ...query,
    data: query.data?.data?.data,
  };
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: any) => noteApi.create(data.topic_id, data.time, data.comment),
    {
      onSuccess: () => {
        toast.success("create note successfully");
        queryClient.invalidateQueries([key, key_get_list]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );
  return mutation;
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data: any) => noteApi.delete(data.id), {
    onSuccess: () => {
      toast.success("delete note successfully");
      queryClient.invalidateQueries([key, key_get_list]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message);
    },
  });
  return mutation;
};
