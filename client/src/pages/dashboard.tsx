import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bienvenue {user?.nom}</h1>
        <button onClick={logout} className="btn btn-outline btn-error">
          Déconnexion
        </button>
      </div>
      <p className="mt-4">Rôle : {user?.role}</p>
    </div>
  );
}
