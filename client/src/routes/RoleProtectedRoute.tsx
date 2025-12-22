/**
 * Gestion de sécurité et protection des routes: affichage des pages appropriées
 */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../typescript/role";
import type { JSX } from "react";

interface Props {
  role: Role | Role[];
  children: JSX.Element;
}

export function RoleProtectedRoute({ role, children }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading loading-spinner" />;
  if (!user) return <Navigate to="/login" />;

  const allowed = Array.isArray(role)
    ? role.includes(user.role as never)
    : user.role === role;

  return allowed ? children : <Navigate to="/unauthorized" />;
}
