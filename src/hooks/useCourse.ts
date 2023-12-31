/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from "@/apis/course.api";
import { IfilterSearch } from "@/contants/filter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const key = "course";
export const key_get_list_course = "get_list_course";
export const key_topic = "topic";
export const key_my_course = "my_course";
export const key_approval = "approval_request";
export const key_get_library = "library";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const createUserMutation = useMutation(
    (data: any) => courseApi.createCourse(data),
    {
      onSuccess: () => {
        toast.success("Course created successfully");
        queryClient.invalidateQueries([key, key_my_course]);
        queryClient.refetchQueries([key, key_get_list_course]);
        queryClient.refetchQueries([
          key,
          key_get_list_course,
          "course_management",
        ]);
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

export const useGetCourse = (id: number, filterPrivate?: boolean) => {
  const query = useQuery([key, id], () => courseApi.getCourseDetail(id));

  return {
    ...query,
    data:
      filterPrivate !== undefined && filterPrivate === true
        ? {
            ...query.data?.data?.data,
            units: query.data?.data?.data.units
              .map((unit: any) => ({
                ...unit,
                topics: unit.topics.filter(
                  (topic: any) => topic.status !== "private"
                ),
              }))
              .filter((unit: any) => unit.status !== "private"),
          }
        : query.data?.data?.data,
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
        queryClient.refetchQueries([key, key_get_list_course]);
        queryClient.refetchQueries([
          key,
          key_get_list_course,
          "course_management",
        ]);
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
        queryClient.refetchQueries([key, key_my_course]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );
  return mutation;
};

export const useGetListApproval = (filter: IfilterSearch) => {
  const query = useQuery([key, key_approval], () =>
    courseApi.getListApproval(filter)
  );
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
        queryClient.refetchQueries([key, course_id]);
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

export const useGetListCourses = (filter: any, keyCustom?: string) => {
  const query = useQuery([key, key_get_list_course, keyCustom], () =>
    courseApi.getListCourses(filter)
  );
  return {
    ...query,
    data: query.data?.data?.data,
  };
};

export const useEnrollCourse = (course_id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data: any) => courseApi.enroll(data.course_id),
    {
      onSuccess: () => {
        // toast.success("Course enroll successfully");
        queryClient.invalidateQueries([key, course_id]);
        queryClient.refetchQueries([key, key_my_course]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );
  return mutation;
};

export const useEnrollMultiCourses = () => {
  const queryClient = useQueryClient();

  const enrollCourses = async (courseIds: number[]) => {
    if (!courseIds.length) {
      return;
    }
    const enrollPromises = courseIds.map((course_id) =>
      courseApi.enroll(course_id)
    );

    try {
      await Promise.all(enrollPromises);
      queryClient.invalidateQueries([key, ...courseIds]);
      queryClient.refetchQueries([key, key_my_course]);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message);
    }
  };

  return enrollCourses;
};

export const useGetLibrary = (filter: IfilterSearch) => {
  const query = useQuery([key, key_get_library], () =>
    courseApi.getLibrary(filter)
  );
  return {
    ...query,
    data: query.data?.data?.data,
  };
};

export const useGetListRecommend = (filter: IfilterSearch) => {
  const query = useQuery([key, "key_get_list_recommend"], () =>
    courseApi.getListRecommend(filter)
  );
  return {
    ...query,
    data: query.data?.data?.data,
  };
};
