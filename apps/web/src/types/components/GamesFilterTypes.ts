export type GamesFilterType = {
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  sports: string[];
  maxPrice: number;
  minPrice: number;
  surface: string[];
  environment: string[];
};
