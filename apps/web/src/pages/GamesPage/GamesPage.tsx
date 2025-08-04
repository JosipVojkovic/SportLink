import c from "./GamesPage.module.css";
import { GamesMap } from "../../components/GamesMap/GamesMap";
import { AngleDownIcon, SlidersIcon } from "../../components/icons";
import { useEffect, useState } from "react";
import type { GamesFilterType } from "../../types";
import { DateRangePicker } from "../../components/DateRangePicker/DateRangePicker";
import { TimeIntervalInput } from "../../components/TimeInput/TimeIntervalInput";
import { toast } from "react-toastify";
import { CheckboxesFilterSection } from "../../components/CheckboxesFilterSection/CheckboxesFilterSection";
import type { Game } from "../../types/api";
import { useFetchGames } from "../../api";

export const GamesPage = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [filters, setFilters] = useState<GamesFilterType>({
    startDate: today,
    endDate: nextMonth,
    startTime: "00:00",
    endTime: "23:30",
    sports: ["Football", "Basketball", "Padel", "Volleyball"],
    maxPrice: 500,
    minPrice: 0,
    surface: ["Turf", "Concrete", "Sand", "Grass", "Parket", "Rubber"],
    environment: ["Outside", "Inside"],
  });

  const { data } = useFetchGames();

  const changeActiveFilter = (filter: string) => {
    if (activeFilter === filter) setActiveFilter("");
    else setActiveFilter(filter);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= filters.maxPrice)
      setFilters((prev) => ({ ...prev, minPrice: value }));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= filters.minPrice)
      setFilters((prev) => ({ ...prev, maxPrice: value }));
  };

  const handleSportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sport = e.target.name;
    const alreadySelected = filters.sports.includes(sport);

    if (alreadySelected && filters.sports.length === 1) {
      toast.error("You must select at least one sport.");
      return;
    }

    setFilters((prev) => ({
      ...prev,
      sports: alreadySelected
        ? prev.sports.filter((s) => s !== sport)
        : [...prev.sports, sport],
    }));
  };

  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const environment = e.target.name;
    const alreadySelected = filters.environment.includes(environment);

    if (alreadySelected && filters.environment.length === 1) {
      toast.error("You must select at least one environment.");
      return;
    }

    setFilters((prev) => ({
      ...prev,
      environment: alreadySelected
        ? prev.environment.filter((e) => e !== environment)
        : [...prev.environment, environment],
    }));
  };

  const handleSurfaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const surface = e.target.name;
    const alreadySelected = filters.surface.includes(surface);

    if (alreadySelected && filters.surface.length === 1) {
      toast.error("You must select at least one surface.");
      return;
    }

    setFilters((prev) => ({
      ...prev,
      surface: alreadySelected
        ? prev.surface.filter((s) => s !== surface)
        : [...prev.surface, surface],
    }));
  };

  const setStartDate = (clickedDate: Date | null) => {
    setFilters((prev) => ({ ...prev, startDate: clickedDate }));
  };

  const setEndDate = (clickedDate: Date | null) => {
    setFilters((prev) => ({ ...prev, endDate: clickedDate }));
  };

  const setSelectedTime = (s: string, e: string) => {
    setFilters((prev) => ({ ...prev, startTime: s, endTime: e }));
  };

  useEffect(() => {
    setVisibleGames(data?.data || []);
  }, [data]);

  console.log("Filters:", filters);

  return (
    <section className={c.gamesSection}>
      <h1>Games</h1>

      <div className={c.availableGamesContainer}>
        <div className={c.gameFilters}>
          <h2>
            Filters <SlidersIcon />
          </h2>

          <div className={c.filters}>
            <div>
              <h3 onClick={() => changeActiveFilter("Date")}>
                Date & Time
                <AngleDownIcon
                  className={activeFilter === "Date" ? c.rotateIcon : ""}
                />
              </h3>

              {activeFilter === "Date" && (
                <div className={c.dateAndTime}>
                  <DateRangePicker
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                  <TimeIntervalInput
                    startTime={filters.startTime}
                    endTime={filters.endTime}
                    onChange={setSelectedTime}
                  />
                </div>
              )}
            </div>

            <CheckboxesFilterSection
              title="Sports"
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              options={["Football", "Basketball", "Padel", "Volleyball"]}
              selected={filters.sports}
              onChange={handleSportChange}
            />

            <div>
              <h3 onClick={() => changeActiveFilter("Price")}>
                Price
                <AngleDownIcon
                  className={activeFilter === "Price" ? c.rotateIcon : ""}
                />
              </h3>

              {activeFilter === "Price" && (
                <div className={c.price}>
                  <label>
                    Max: {filters.maxPrice}€
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={filters.maxPrice}
                      onChange={handleMaxChange}
                    />
                  </label>

                  <label>
                    Min: {filters.minPrice}€
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={filters.minPrice}
                      onChange={handleMinChange}
                    />
                  </label>
                </div>
              )}
            </div>

            <CheckboxesFilterSection
              title="Environment"
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              options={["Outside", "Inside"]}
              selected={filters.environment}
              onChange={handleEnvironmentChange}
            />

            <CheckboxesFilterSection
              title="Surface"
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              options={[
                "Turf",
                "Concrete",
                "Sand",
                "Grass",
                "Parket",
                "Rubber",
              ]}
              selected={filters.surface}
              onChange={handleSurfaceChange}
            />
          </div>

          <button>Filter</button>
        </div>

        <GamesMap visibleGames={visibleGames} />
      </div>
    </section>
  );
};
