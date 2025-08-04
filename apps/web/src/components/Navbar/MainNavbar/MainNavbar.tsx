import c from "./MainNavbar.module.css";
import { NavLink } from "react-router-dom";
import { routes } from "../../../constants/routes";
import { ProfileIcon, NotificationIcon } from "../../icons";
import { Sidebar } from "../Sidebar/Sidebar";
import { useState } from "react";

export const MainNavbar = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  const toggleSidebar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDisplaySidebar((prev) => !prev);
  };

  return (
    <nav className={c.mainNavbar}>
      <h2>SportLink</h2>

      <ul className={c.navLinks}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? c.active : "")}
            to={routes.HOME}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? c.active : "")}
            to={routes.GAMES}
          >
            Games
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? c.active : "")}
            to={routes.MY_GAMES}
          >
            My Games
          </NavLink>
        </li>
      </ul>

      <div className={c.navIcons}>
        <NotificationIcon />
        <ProfileIcon onClick={toggleSidebar} />
      </div>

      <Sidebar
        displaySidebar={displaySidebar}
        onClose={() => setDisplaySidebar(false)}
      />
    </nav>
  );
};
