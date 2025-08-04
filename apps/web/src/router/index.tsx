import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../constants/routes";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { MainLayout } from "../layouts";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { HomePage } from "../pages/HomePage/HomePage";
import { AuthRoute } from "../components/AuthRoute";
import { GamesPage } from "../pages/GamesPage/GamesPage";
import { MyGamesPage } from "../pages/MyGamesPage/MyGamesPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.LOGIN}
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path={routes.REGISTER}
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={routes.HOME} element={<HomePage />} />
          <Route path={routes.GAMES} element={<GamesPage />} />
          <Route path={routes.MY_GAMES} element={<MyGamesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
