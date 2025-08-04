import { api } from "../base";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import type { AxiosResponse } from "axios";

type LogoutResponse = { message: string };

const logoutUser = async (): Promise<AxiosResponse<LogoutResponse>> => {
  return api.post("/auth/logout");
};

export const useLogout = (navigate: () => void) => {
  const { setAccessToken } = useAuthContext();

  return useMutation({
    mutationFn: logoutUser,
    mutationKey: ["logout-user"],
    onSuccess: (response: AxiosResponse<LogoutResponse>) => {
      setAccessToken(null);
      navigate();
      toast.success(response.data.message);
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
