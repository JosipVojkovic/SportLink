import { useEffect, useState } from "react";
import type { Location } from "./GamesMap";
import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";
import c from "./MapWithGames.module.css";
import BasketballIcon from "../../assets/images/basketball (1).png";
import FootballIcon from "../../assets/images/soccer-ball.png";
import VolleyballIcon from "../../assets/images/volleyball (2).png";
import PadelIcon from "../../assets/images/paddle (2).png";
import type { Game } from "../../types/api";
import { Legend } from "../MapLegend/MapLegend";

export const MapWithGames = ({
  location,
  games,
  mapId,
}: {
  location: Location;
  games: Game[];
  mapId: string;
}) => {
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [clickedMarker, setClickedMarker] = useState<string | null>(null);

  const map = useMap();

  const getIcon = (sport: string) => {
    switch (sport) {
      case "Football":
        return FootballIcon;
      case "Basketball":
        return BasketballIcon;
      case "Volleyball":
        return VolleyballIcon;
      case "Padel":
        return PadelIcon;
      default:
        return FootballIcon;
    }
  };

  const handleMarkerClick = (gameId: string) => {
    setClickedMarker(gameId);
  };

  useEffect(() => {
    if (!map) return;

    const listener = map.addListener("bounds_changed", () => {
      const bounds = map.getBounds();
      if (!bounds) return;

      const filtered = games.filter((game) =>
        bounds.contains({ lat: game.latitude, lng: game.longitude })
      );

      setVisibleGames(filtered);
    });

    return () => {
      listener.remove();
    };
  }, [map, games]);

  return (
    <>
      <Map
        defaultCenter={{ lat: location.latitude, lng: location.longitude }}
        defaultZoom={13}
        mapId={mapId}
        gestureHandling="greedy"
        disableDefaultUI={true}
        zoomControl={true}
        style={{ width: "100%", height: "100%" }}
      >
        <AdvancedMarker
          position={{ lat: location.latitude, lng: location.longitude }}
        />
        {visibleGames.map((game) => (
          <AdvancedMarker
            key={game.id}
            position={{ lat: game.latitude, lng: game.longitude }}
            onClick={() => handleMarkerClick(game.id)}
            zIndex={clickedMarker === game.id ? 9999 : 1}
          >
            {clickedMarker === game.id ? (
              <div className={c.clickedMarker}>
                <h4>{game.title}</h4>

                <p>
                  {game.sport.name} - {game.date}
                </p>
              </div>
            ) : (
              <div className={c.gameMarker}>
                <img src={getIcon(game.sport.name)} />
              </div>
            )}
          </AdvancedMarker>
        ))}
      </Map>

      <Legend />
    </>
  );
};
