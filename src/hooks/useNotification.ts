import notificationApi from "@/apis/notification.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const key = "notifications";
const key_get_list = "notification_getlist";

export const useGetNotification = () => {
  const query = useQuery([key, key_get_list], () =>
    notificationApi.getUnreadList()
  );
  return {
    ...query,
    data: query.data?.data?.data,
  };
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data?: { id?: number }) => notificationApi.markRead(data?.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([key, key_get_list]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );
  return mutation;
};
