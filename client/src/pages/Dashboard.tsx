import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion " + err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                Bonjour,{" "}
                <span className="text-primary">
                  {user?.nom} {user?.prenom}{" "}
                </span>{" "}
                👋
              </h1>
              <button onClick={handleLogout} className="btn btn-error btn-sm">
                Déconnexion
              </button>
            </div>

            <div className="mt-6">
              <p className="text-gray-500">
                Bienvenue sur votre tableau de bord.
              </p>

              <div className="mt-4">
                <span className="badge badge-outline">Rôle : {user?.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
