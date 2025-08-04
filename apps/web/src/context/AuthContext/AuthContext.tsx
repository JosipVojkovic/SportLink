import { createContext, useEffect, useState } from "react";
import { api, setupInterceptors } from "../../api";
import { Loader } from "../../components/Loader/Loader";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setupInterceptors(() => accessToken, setAccessToken);

    const tryRefreshToken = async () => {
      try {
        const response = await api.post("/auth/refresh");
        setAccessToken(response.data.accessToken);
      } catch (err) {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    tryRefreshToken();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
