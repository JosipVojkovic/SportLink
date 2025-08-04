import { Outlet } from "react-router-dom";
import { MainNavbar } from "../components/Navbar/MainNavbar/MainNavbar";

export const MainLayout = () => {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
};
