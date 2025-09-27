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
import { XIcon } from "../icons";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils";

export const MapWithGames = ({
  center,
  userLocation,
  games,
  mapId,
}: {
  center: Location;
  userLocation: Location | null;
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
    if (!map || !games.length) {
      setVisibleGames(games);
      return;
    }

    const bounds = map.getBounds();
    if (!bounds) {
      setVisibleGames(games);
      return;
    }

    const filtered = games.filter((game) =>
      bounds.contains({ lat: game.latitude, lng: game.longitude })
    );

    setVisibleGames(filtered);
  }, [map, games]);

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
        defaultCenter={{ lat: center.latitude, lng: center.longitude }}
        defaultZoom={userLocation ? 13 : 2}
        mapId={mapId}
        gestureHandling="greedy"
        disableDefaultUI={true}
        zoomControl={true}
        style={{ width: "100%", height: "100%" }}
      >
        {userLocation && (
          <AdvancedMarker
            position={{
              lat: userLocation.latitude,
              lng: userLocation.longitude,
            }}
          />
        )}
        {visibleGames.map((game) => (
          <AdvancedMarker
            key={game.id}
            position={{ lat: game.latitude, lng: game.longitude }}
            onClick={() => handleMarkerClick(game.id)}
            zIndex={clickedMarker === game.id ? 9999 : 1}
          >
            {clickedMarker === game.id ? (
              <div className={c.clickedMarker}>
                <div className={c.header}>
                  <img src={getIcon(game.sport.name)} className={c.sportIcon} />
                  <h4>{game.title}</h4>
                  <XIcon
                    className={c.closeIcon}
                    onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => {
                      e.stopPropagation();
                      setClickedMarker(null);
                    }}
                  />
                </div>

                <div className={c.details}>
                  <p>
                    <strong>Players:</strong> {game.currentPlayers}/
                    {game.maxPlayers}
                  </p>

                  <p>
                    <strong>Date:</strong> {formatDate(game.date)}
                  </p>

                  <p>
                    <strong>Price:</strong> {game.price}€
                  </p>
                </div>

                <Link to={`/games/${game.id}`}>
                  <button className={c.detailsButton}>View Details</button>
                </Link>
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
