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

  const [mapCenter, setMapCenter] = useState<Location>(FALLBACK_LOCATION);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setMapCenter(loc);
        setUserLocation(loc);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <div className={c.map}>
      <APIProvider apiKey={mapApiKey}>
        {isLoading ? (
          <Loader />
        ) : (
          <MapWithGames
            center={mapCenter}
            userLocation={userLocation}
            games={visibleGames}
            mapId={mapId}
          />
        )}
      </APIProvider>
    </div>
  );
};
