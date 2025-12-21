import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, motDePasse);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full rounded-2xl flex items-center justify-center bg-linear-to-br from-base-200 to-base-300">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl rounded-xl">
        <div className="card-body space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold">Connexion</h2>
            <p className="text-sm text-neutral-500">
              Accédez à votre espace de gestion des congés
            </p>
          </div>

          {error && (
            <div className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Adresse email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="ex: nom@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="••••••••"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
              />
            </div>

            <button
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="divider text-sm text-neutral-400">
            LeaveFlow - Portail RH
          </div>

          <p className="text-xs text-center text-neutral-500">
            © {new Date().getFullYear()} LeaveFlow · Gestion des congés
          </p>
        </div>
      </div>
    </div>
  );
}
