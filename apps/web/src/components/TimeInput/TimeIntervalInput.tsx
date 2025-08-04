import { useState, useEffect, useRef } from "react";
import styles from "./TimeIntervalInput.module.css";
import { ClockIcon } from "../icons";
import { toast } from "react-toastify";

export const TimeIntervalInput = ({
  startTime,
  endTime,
  onChange,
}: {
  startTime: string;
  endTime: string;
  onChange: (start: string, end: string) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [tempStart, setTempStart] = useState(startTime);
  const [tempEnd, setTempEnd] = useState(endTime);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const generateTimes = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, "0");
        const minute = m.toString().padStart(2, "0");
        times.push(`${hour}:${minute}`);
      }
    }
    return times;
  };

  const times = generateTimes();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = () => {
    if (
      tempStart &&
      tempEnd &&
      (tempStart > tempEnd || tempStart === tempEnd)
    ) {
      toast.error("End time must be after start time");
      return;
    }
    onChange(tempStart, tempEnd);
    setShowDropdown(false);
  };

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          readOnly
          value={
            startTime && endTime
              ? `${startTime} - ${endTime}`
              : "Select interval"
          }
          onClick={() => setShowDropdown((prev) => !prev)}
          className={styles.input}
        />
        <ClockIcon
          className={styles.icon}
          onClick={() => setShowDropdown((prev) => !prev)}
        />
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.selectGroup}>
            <label>From:</label>
            <select
              value={tempStart}
              onChange={(e) => setTempStart(e.target.value)}
            >
              <option value="">--</option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.selectGroup}>
            <label>To:</label>
            <select
              value={tempEnd}
              onChange={(e) => setTempEnd(e.target.value)}
            >
              <option value="">--</option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSave} className={styles.saveBtn}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};
