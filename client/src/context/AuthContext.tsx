import { createContext, useContext, useEffect, useState } from "react";
import { getMe, login as apiLogin, logout as apiLogout } from "../api/auth";

interface User {
  _id: string;
  nom: string;
  email: string;
  role: "EMPLOYE" | "GESTIONNAIRE";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, motDePasse: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, motDePasse: string) => {
    await apiLogin(email, motDePasse);
    const res = await getMe();
    setUser(res.data);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
