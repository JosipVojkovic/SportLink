import { createContext, useEffect, useState } from "react";
import { setupInterceptors } from "../../api";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    setupInterceptors(() => accessToken, setAccessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
