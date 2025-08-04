import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";
import { api } from "../base";
import type { AxiosResponse } from "axios";
import type { RefreshResponse } from "../../types/AuthTypes";
import { toast } from "react-toastify";

const refreshToken = async (): Promise<AxiosResponse<RefreshResponse>> => {
  return api.post("/auth/refresh");
};

export const useRefreshToken = () => {
  const { setAccessToken } = useAuthContext();

  return useMutation({
    mutationFn: refreshToken,
    mutationKey: ["refresh-token"],
    onSuccess: (response: AxiosResponse<RefreshResponse>) => {
      const token = response.data.accessToken;

      if (!token) {
        toast.error("Access token not received.");
        return;
      }

      setAccessToken(token);
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
