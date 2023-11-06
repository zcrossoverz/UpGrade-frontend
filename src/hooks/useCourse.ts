/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from "@/apis/course.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const key = "course";
const key_topic = "topic";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const createUserMutation = useMutation(
    (data: any) => courseApi.createCourse(data),
    {
      onSuccess: () => {
        toast.success("Course created successfully");
        queryClient.invalidateQueries([key, "my_course"]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  return createUserMutation;
};

export const useGetMyCourses = () => {
  const query = useQuery([key, "my_course"], courseApi.getMyCourses);
  return {
    ...query,
    data: query.data?.data?.data,
  };
};

export const useGetCourse = (id: number) => {
  const query = useQuery([key, id], () => courseApi.getCourseDetail(id));
  return {
    ...query,
    data: query.data?.data?.data,
  };
};

export const useGetTopic = (id: number) => {
  const query = useQuery([key, key_topic, id], () => courseApi.getTopic(id));
  return {
    ...query,
    data: query.data?.data?.data,
  };
};
