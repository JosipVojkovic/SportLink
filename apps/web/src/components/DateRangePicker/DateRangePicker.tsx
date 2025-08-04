import { useState, useEffect, useRef } from "react";
import styles from "./DateRangePicker.module.css";
import { CalendarIcon } from "../icons";
import { stripTime } from "../../utils";

export const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (clickedDate: Date | null) => void;
  setEndDate: (clickedDate: Date | null) => void;
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const pickerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate >= startDate) {
        setEndDate(clickedDate);
      } else {
        setEndDate(startDate);
        setStartDate(clickedDate);
      }
    }
  };

  const isDisabled = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    const todayDate = stripTime(today);
    const maxDateStripped = stripTime(maxDate);

    return date < todayDate || date > maxDateStripped;
  };

  const isSelected = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return (
      (startDate && date.toDateString() === startDate.toDateString()) ||
      (endDate && date.toDateString() === endDate.toDateString())
    );
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date > startDate && date < endDate;
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className={styles.datePicker} ref={pickerRef}>
      <input
        type="text"
        value={
          startDate && endDate
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
            : startDate
              ? startDate.toLocaleDateString()
              : ""
        }
        onClick={() => setShowCalendar((prev) => !prev)}
        readOnly
        placeholder="Select date range"
      />

      <CalendarIcon
        className={styles.calendarIcon}
        onClick={() => setShowCalendar((prev) => !prev)}
      />

      {showCalendar && (
        <div className={styles.calendar}>
          <div className={styles.header}>
            <button onClick={() => changeMonth(-1)}>{"<"}</button>
            <span>
              {currentMonth.toLocaleString("en-US", { month: "long" })}{" "}
              {currentMonth.getFullYear()}
            </span>
            <button onClick={() => changeMonth(1)}>{">"}</button>
          </div>

          <div className={styles.weekDays}>
            {daysOfWeek.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className={styles.days}>
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <span key={`empty-${i}`} className={styles.empty}></span>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const disabled = isDisabled(day);
              return (
                <span
                  key={day}
                  className={`
                    ${disabled ? styles.disabled : ""}
                    ${isSelected(day) ? styles.selected : ""}
                    ${isInRange(day) ? styles.inRange : ""}
                  `}
                  onClick={() => !disabled && handleDateClick(day)}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
