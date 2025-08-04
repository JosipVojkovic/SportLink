import { AngleDownIcon } from "../icons";
import c from "./CheckboxesFilterSection.module.css";

type CheckboxesFilterSectionProps = {
  title: string;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  options: string[];
  selected: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckboxesFilterSection = ({
  title,
  activeFilter,
  setActiveFilter,
  options,
  selected,
  onChange,
}: CheckboxesFilterSectionProps) => {
  const isActive = activeFilter === title;

  return (
    <div>
      <h3 onClick={() => setActiveFilter(isActive ? "" : title)}>
        {title}
        <AngleDownIcon className={isActive ? c.rotateIcon : ""} />
      </h3>

      {isActive && (
        <div className={c.options}>
          {options.map((option) => (
            <label key={option}>
              {option}
              <input
                type="checkbox"
                name={option}
                checked={selected.includes(option)}
                onChange={onChange}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
