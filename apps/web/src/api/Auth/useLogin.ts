import { api } from "../base";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { LoginRequest, LoginResponse } from "../../types/AuthTypes";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import type { AxiosResponse } from "axios";

export type JwtResponse = {
  token: string;
};

const loginUser = async (
  loginData: LoginRequest
): Promise<AxiosResponse<LoginResponse>> => {
  return api.post("/auth/login", loginData);
};

export const useLogin = (navigate: () => void) => {
  const { setAccessToken } = useAuthContext();

  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["login-user"],
    onSuccess: (response: AxiosResponse<LoginResponse>) => {
      const token = response.data.accessToken;

      if (!token) {
        toast.error("Access token not received.");
        return;
      }

      setAccessToken(token);
      navigate();
      toast.success("Successfully logged in!");
    },
    onError(error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("An unknown error occurred.");
      }
    },
  });
};
