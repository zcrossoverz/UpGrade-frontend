import userApi from "@/apis/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const key = "users";

export const useGetUsers = () => {
  return useQuery([key], userApi.getUsers);
};

export const useCreateUser = () => {
  const createUserMutation = useMutation(
    (userData: { email: string; password: string }) =>
      userApi.register(userData.email, userData.password),
    {
      onSuccess: (response: AxiosResponse) => {
        toast.success("User created successfully");
        console.log(response);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  return createUserMutation;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation(
    (updateDto: {
      firstName?: string;
      lastName?: string;
      password?: string;
      bio?: string;
      email?: string;
    }) => userApi.updateUser(updateDto),
    {
      onSuccess: () => {
        toast.success("User update successfully");
        queryClient.invalidateQueries(["validateToken"]);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  return updateUserMutation;
};
