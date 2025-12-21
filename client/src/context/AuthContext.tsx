/**
 * Authentification provider
 */
import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth.api";

interface AuthContextType {
  user: authApi.User | null;
  loading: boolean;
  login: (email: string, motDePasse: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<authApi.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi
      .getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, motDePasse: string) => {
    await authApi.login(email, motDePasse);
    const me = await authApi.getMe();
    setUser(me);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
