import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../constants/routes";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { MainLayout } from "../layouts";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { HomePage } from "../pages/HomePage/HomePage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route path={routes.REGISTER} element={<RegisterPage />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={routes.HOME} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
