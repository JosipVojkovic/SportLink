export type Game = {
  id: string;
  title: string;
  description: string;
  format: string;
  date: string;
  price: number;
  duration: number;
  location: string;
  latitude: number;
  longitude: number;
  maxPlayers: number;
  currentPlayers: number;
  status: string;
  surface: string;
  environment: string;
  sportId: string;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
  sport: {
    name: string;
  };
};
