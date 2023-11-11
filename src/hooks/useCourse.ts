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

export const useGetListTopics = (id: number) => {
  const query = useQuery([key, key_topic, "list_topics", id], () =>
    courseApi.getListTopics(id)
  );
  return {
    ...query,
    data: query.data?.data?.data,
  };
};

export const useCreateUnit = (course_id: any) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data: any) => courseApi.createUnit(data), {
    onSuccess: () => {
      toast.success("Unit created successfully");
      queryClient.invalidateQueries([key, course_id]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message);
    },
  });

  return mutation;
};

export const useUpdateUnit = (course_id: any) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data: any) => courseApi.updateUnit(data), {
    onSuccess: () => {
      toast.success("Unit update successfully");
      queryClient.invalidateQueries([key, course_id]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message);
    },
  });

  return mutation;
};

export const useDeleteUnit = (course_id: any) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (unit_id: number) => courseApi.deleteUnit(unit_id),
    {
      onSuccess: () => {
        toast.success("Unit delete successfully");
        queryClient.invalidateQueries([key, course_id]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  return mutation;
};

export const useCreateTopic = (unit_id: number) => {
  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (data: any) => courseApi.createTopic(data),
    {
      onSuccess: () => {
        toast.success("Topic created successfully");
        queryClient.invalidateQueries([key, key_topic, "list_topics", unit_id]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  return createMutation;
};

export const useUpdateTopic = (unit_id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data: any) => courseApi.updateTopic(data), {
    onSuccess: () => {
      toast.success("Topic update successfully");
      queryClient.invalidateQueries([key, key_topic, "list_topics", unit_id]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message);
    },
  });

  return mutation;
};

export const useDeleteTopic = (unit_id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (topic_id: number) => courseApi.deleteTopic(topic_id),
    {
      onSuccess: () => {
        toast.success("Topic delete successfully");
        queryClient.invalidateQueries([key, key_topic, "list_topics", unit_id]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  return mutation;
};
