import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../constants/routes";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route path={routes.REGISTER} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
