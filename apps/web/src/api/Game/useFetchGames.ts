import { api } from "../base";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import type { AxiosResponse } from "axios";
import type { Game } from "../../types/api";

const fetchGames = async (): Promise<AxiosResponse<Game[]>> => {
  return api.get("/game");
};

export const useFetchGames = () => {
  const query = useQuery<AxiosResponse<Game[]>, Error>({
    queryKey: ["fetch-games"],
    queryFn: fetchGames,
  });

  useEffect(() => {
    if (query.isSuccess) {
      toast.success("Successfully fetched games!");
      console.log("Games fetched successfully:", query.data?.data);
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isError) {
      const error = query.error;
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  }, [query.isError, query.error]);

  return query;
};
