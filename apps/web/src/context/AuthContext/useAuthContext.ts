import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth mora biti unutar AuthProvider-a");

  return context;
};
