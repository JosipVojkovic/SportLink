import { Link, useNavigate } from "react-router-dom";
import c from "./Sidebar.module.css";
import { useLogout } from "../../../api";
import { Loader } from "../../Loader/Loader";
import { XIcon } from "../../icons";

type SidebarProps = {
  displaySidebar: boolean;
  onClose: () => void;
};

export const Sidebar = ({ displaySidebar, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogout(() =>
    navigate("/login", { replace: true })
  );

  if (!displaySidebar) return null;

  return (
    <>
      <div className={c.sidebarOverlay} onClick={onClose}>
        <div className={c.sidebar} onClick={(e) => e.stopPropagation()}>
          <div className={c.sidebarHeader}>
            <h4>Josip Vojković</h4>
            <XIcon onClick={onClose} />
          </div>

          <ul>
            <li>
              <Link to="profile">Profile</Link>
            </li>
            <li>
              <Link to="avatar">Avatar</Link>
            </li>
          </ul>

          <button onClick={() => mutateAsync()}>Logout</button>
        </div>
      </div>

      {isPending && <Loader />}
    </>
  );
};
