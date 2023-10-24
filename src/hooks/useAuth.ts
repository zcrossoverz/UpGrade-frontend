import authApi from "@/apis/auth.api";
import { getToken, removeToken, setToken } from "@/utils/authentication";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const key = "validateToken";

export const useValidateToken = () => {
  return useQuery([key], authApi.validateToken, {
    enabled: getToken() !== null,
    cacheTime: 24 * 60 * 60 * 1000, // 1 day
    staleTime: 60 * 60 * 1000, // 60 minutes
    onError: () => {
      removeToken();
    },
  });
};

export const useAuth = () => {
  const query = useValidateToken();

  return {
    isAuthenticated: getToken() !== null,
    ...query,
    data: query.data?.data?.data,
    isAdmin: query.data?.data?.data?.role === "admin",
  };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginMutation = useMutation(
    (payload: { email: string; password: string }) =>
      authApi.login(payload.email, payload.password),
    {
      onSuccess: (response: AxiosResponse) => {
        setToken(response.data.data.token);
        navigate(location.state?.from || "/");
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  return loginMutation;
};

export const useLogout = () => {
  const mutateLogout = useMutation(authApi.logout, {
    onSuccess: () => {
      removeToken();
    },
  });
  const { mutate } = mutateLogout;
  return mutate;
};
