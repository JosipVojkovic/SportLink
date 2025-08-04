import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext/useAuthContext";
import { isTokenExpired } from "../utils";

type AuthRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

export const AuthRoute = ({ children, redirectTo = "/" }: AuthRouteProps) => {
  const { accessToken } = useAuthContext();

  const isAuthenticated = !!accessToken && !isTokenExpired(accessToken);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
