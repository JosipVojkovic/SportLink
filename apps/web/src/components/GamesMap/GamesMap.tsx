import c from "./GamesMap.module.css";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { MapWithGames } from "./MapWithGames";
import type { Game } from "../../types/api";

export type Location = {
  latitude: number;
  longitude: number;
};

const FALLBACK_LOCATION: Location = {
  latitude: 45.815399,
  longitude: 15.966568,
};

export const GamesMap = ({ visibleGames }: { visibleGames: Game[] }) => {
  const mapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLocation(FALLBACK_LOCATION);
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err: GeolocationPositionError) => {
        setError("Unable to retrieve location: " + err.message);
        setLocation(FALLBACK_LOCATION);
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <div className={c.map}>
      <APIProvider apiKey={mapApiKey}>
        {isLoading || !location ? (
          <Loader />
        ) : (
          <MapWithGames
            location={location}
            games={visibleGames}
            mapId={mapId}
          />
        )}
      </APIProvider>
    </div>
  );
};
