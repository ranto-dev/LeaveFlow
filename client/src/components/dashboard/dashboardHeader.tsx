import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Modal from "../Modal";
import { toastPromise } from "../../utils/toastPromise";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmLogout = async () => {
    try {
      setLoading(true);
      await toastPromise(logout(), {
        loading: "Déconnexion en cours...",
        success: "Déconnexion réussie",
        error: "Erreur lors de la déconnexion",
      });
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la déconnexion", err);
    } finally {
      setLoading(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <>
      <header className="sticky container mx-auto  top-0 z-40 bg-base-100/80 backdrop-blur border-b border-neutral-500/20">
        <div className="w-full container mx-auto border border-neutral-500/30 shadow-xl rounded-lg p-4 flex justify-between items-center">
          <div className="text-md">
            <span className="text-primary">Leave</span>Flow
          </div>

          <div className="flex items-center gap-4">
            <div
              className="tooltip tooltip-bottom"
              data-tip={user ? `${user.email} - ${user.role}` : ""}
            >
              <div className="avatar avatar-online avatar-placeholder cursor-pointer">
                <div className="bg-primary text-primary-content w-12 rounded-full">
                  <span className="text-lg font-semibold">
                    {user?.nom?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="btn btn-error btn-sm"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-bold">Confirmer la déconnexion</h2>

          <p className="text-white">
            Êtes-vous sûr de vouloir vous déconnecter ?
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              className="btn btn-outline"
              onClick={() => setIsLogoutModalOpen(false)}
              disabled={loading}
            >
              Annuler
            </button>

            <button
              className={`btn btn-error ${loading ? "loading" : ""}`}
              onClick={confirmLogout}
              disabled={loading}
            >
              {loading ? "Déconnexion..." : "Confirmer"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DashboardHeader;
