import authApi from "@/apis/auth.api";
import userApi from "@/apis/user.api";
import { IfilterSearch } from "@/contants/filter";
import { setToken } from "@/utils/authentication";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const key = "users";
const key_get_list = "users_get_list";

export const useCreateUser = () => {
  const createUserMutation = useMutation(
    (userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) =>
      userApi.register(
        userData.email,
        userData.password,
        userData.firstName,
        userData.lastName
      ),
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

export const useRefetchToken = () => {
  return useQuery(["refetchToken"], authApi.refreshToken);
};

export const useUpdateUser = (notRefreshToken?: boolean) => {
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation(
    (updateDto: {
      firstName?: string;
      lastName?: string;
      password?: string;
      bio?: string;
      email?: string;
      isActive?: boolean;
      id?: number;
    }) => userApi.updateUser(updateDto),
    {
      onSuccess: async () => {
        toast.success("User update successfully");
        if (notRefreshToken === undefined) {
          const token = await authApi.refreshToken();
          if (token.data?.data) {
            setToken(token.data?.data);
          }
          queryClient.invalidateQueries(["validateToken"]);
        } else {
          queryClient.invalidateQueries([key, key_get_list]);
        }
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  return updateUserMutation;
};

export const useGetListUser = (filter: IfilterSearch) => {
  const query = useQuery([key, key_get_list], () =>
    userApi.getListUsers(filter)
  );

  return {
    ...query,
    data: query.data?.data?.data,
  };
};
