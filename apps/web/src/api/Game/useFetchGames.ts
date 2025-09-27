import { api } from "../base";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { Game } from "../../types/api";
import { useEffect } from "react";
import type { BackendGamesFilterType } from "../../types";

const fetchGames = async (filters: BackendGamesFilterType): Promise<Game[]> => {
  const response = await api.post("/game/search", filters);
  return response.data;
};

export const useFetchGames = (filters: BackendGamesFilterType) => {
  const query = useQuery({
    queryKey: ["fetch-games"],
    queryFn: () => fetchGames(filters),
    enabled: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      toast.success("Successfully fetched games!");
      console.log("Games fetched successfully:", query.data);
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError && query.error) {
      if (query.error instanceof Error) {
        toast.error(query.error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  }, [query.isError, query.error]);

  return query;
};
