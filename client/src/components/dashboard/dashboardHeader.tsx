import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion " + err);
    }
  };

  return (
    <header>
      <div className="w-full m-auto container border border-neutral-500/30 shadow-xl rounded-lg p-4 flex justify-between items-center">
        <div>LeaveFlow</div>
        <div>
          <ul className="flex justify-center items-center gap-2">
            <li>
              <button onClick={handleLogout} className="btn btn-error btn-sm">
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
