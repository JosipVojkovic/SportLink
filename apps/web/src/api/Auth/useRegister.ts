import { toast } from "react-toastify";
import { api } from "../base";
import type { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import type { RegisterRequest, RegisterResponse } from "../../types/AuthTypes";

const registerUser = async (
  registerData: RegisterRequest
): Promise<AxiosResponse<RegisterResponse>> => {
  return api.post("/auth/register", registerData);
};

export const useRegister = (navigate: () => void) => {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: ["register-user"],
    onSuccess: (response: AxiosResponse<RegisterResponse>) => {
      console.log(response.data);
      navigate();
      toast.success("Successfully registered!");
    },
    onError(error: string) {
      toast.error(error);
    },
  });
};
