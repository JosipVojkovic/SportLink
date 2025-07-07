import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";
import type { RefreshResponse } from "../types/AuthTypes";

export type ErrorResponseType = AxiosError & {
  response: AxiosResponse<{
    statusCode: number;
    message: string;
    error: string;
  }>;
};

export const api: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (
  getAccessToken: () => string | null,
  setAccessToken: (token: string | null) => void
) => {
  api.interceptors.request.use(async (config) => {
    const excludedRoutes = ["/auth/login", "/auth/register"];

    const shouldAddToken = !excludedRoutes.some((route) =>
      config.url?.includes(route)
    );

    if (shouldAddToken) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: ErrorResponseType) => {
      if (error.response?.status === 401) {
        try {
          const refreshResponse: RefreshResponse =
            await api.post("auth/refresh");

          const newToken = refreshResponse.accessToken;
          console.log(newToken);
          setAccessToken(newToken);

          if (error.config) {
            error.config.headers.Authorization = `Bearer ${newToken}`;

            return api.request(error.config);
          }
        } catch (refreshError) {
          setAccessToken(null);
        }
      }

      return Promise.reject(
        error.response?.data.message || error.message || "Network error"
      );
    }
  );
};
