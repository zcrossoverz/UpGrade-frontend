/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from "@/apis/course.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const key = "course";
const key_topic = "topic";
const key_my_course = "my_course";
const key_approval = "approval_request";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const createUserMutation = useMutation(
    (data: any) => courseApi.createCourse(data),
    {
      onSuccess: () => {
        toast.success("Course created successfully");
        queryClient.invalidateQueries([key, key_my_course]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  return createUserMutation;
};

export const useGetMyCourses = () => {
  const query = useQuery([key, key_my_course], courseApi.getMyCourses);
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

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: { course_id: number }) => courseApi.deleteCourse(data.course_id),
    {
      onSuccess: () => {
        toast.success("Course delete successfully");
        queryClient.invalidateQueries([key, key_my_course]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  return mutation;
};

export const useSubmitApprovalCourse = (course_id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: { course_id: number }) => courseApi.submitApproval(data.course_id),
    {
      onSuccess: () => {
        toast.success("Submit approval successfully");
        queryClient.invalidateQueries([key, course_id]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );
  return mutation;
};

export const useGetListApproval = () => {
  const query = useQuery([key, key_approval], courseApi.getListApproval);
  return {
    ...query,
    data: query.data?.data?.data,
  };
};

export const useProcessApprovalCourse = (course_id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: { course_id: number; isAccept: boolean }) =>
      courseApi.processApproval(data.course_id, data.isAccept),
    {
      onSuccess: () => {
        toast.success("Process approval successfully");
        queryClient.invalidateQueries([key, key_approval]);
        queryClient.invalidateQueries([key, course_id]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );
  return mutation;
};

export const useUpdateCourse = (course_id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data: any) => courseApi.updateCourse(data), {
    onSuccess: () => {
      toast.success("Course update successfully");
      queryClient.invalidateQueries([key, course_id]);
      queryClient.refetchQueries([key, key_my_course]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message);
    },
  });
  return mutation;
};
