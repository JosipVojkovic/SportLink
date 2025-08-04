import c from "./MapLegend.module.css";
import FootballIcon from "../../assets/images/soccer-ball.png";
import BasketballIcon from "../../assets/images/basketball (1).png";
import VolleyballIcon from "../../assets/images/volleyball (2).png";
import PadelIcon from "../../assets/images/paddle (2).png";

export const Legend = () => {
  return (
    <div className={c.legendContainer}>
      <h4>Legend</h4>
      <ul className={c.legendList}>
        <li>
          <img src={FootballIcon} alt="Football" />
          <span>Football</span>
        </li>
        <li>
          <img src={BasketballIcon} alt="Basketball" />
          <span>Basketball</span>
        </li>
        <li>
          <img src={VolleyballIcon} alt="Volleyball" />
          <span>Volleyball</span>
        </li>
        <li>
          <img src={PadelIcon} alt="Padel" />
          <span>Padel</span>
        </li>
      </ul>
    </div>
  );
};
