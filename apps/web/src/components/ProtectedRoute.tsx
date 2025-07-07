import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext/useAuthContext";

const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuthContext();

  if (!accessToken || isTokenExpired(accessToken)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
