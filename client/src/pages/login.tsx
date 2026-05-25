/**
 * Page de connexion - LeaveFlow
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative min-h-screen w-full flex items-center justify-center bg-linear-to-tr from-base-300 via-base-200 to-primary/10 overflow-hidden px-4">
      {/* Éléments de décor en arrière-plan (Blobs) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      {/* Carte Principale animée */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card w-full max-w-md bg-base-100/80 backdrop-blur-md shadow-xl border border-base-content/5 rounded-2xl z-10"
      >
        <div className="card-body p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2"
            >
              <LogIn className="w-6 h-6" />
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight text-base-content">
              Bienvenue
            </h2>
            <p className="text-sm text-base-content/60">
              Accédez à votre espace **LeaveFlow**
            </p>
          </div>

          {/* Message d'erreur animé */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                className="alert alert-error text-sm flex items-center gap-2 rounded-xl shadow-inner"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Adresse email</span>
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-5 h-5 text-base-content/40 pointer-events-none" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-12 bg-base-200/50 focus:bg-base-100 transition-all duration-200 rounded-xl"
                  placeholder="nom@entreprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="form-control">
              <label className="label flex justify-between items-center">
                <span className="label-text font-medium">Mot de passe</span>
                <a
                  href="#"
                  className="label-text-alt link link-hover text-primary font-medium"
                >
                  Oublié ?
                </a>
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-5 h-5 text-base-content/40 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12 pr-12 bg-base-200/50 focus:bg-base-100 transition-all duration-200 rounded-xl"
                  placeholder="••••••••"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-base-content/40 hover:text-base-content/80 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Bouton de Soumission */}
            <motion.button
              whileHover={{ scale: 101 === 101 ? 1.01 : 1 }}
              whileTap={{ scale: 0.99 }}
              className="btn btn-primary w-full rounded-xl mt-2 font-semibold shadow-lg shadow-primary/20"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  Se connecter
                  <LogIn className="w-4 h-4 ml-2" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer de la carte */}
          <div className="space-y-4 pt-2">
            <div className="divider text-xs tracking-wider uppercase text-base-content/30">
              Portail RH Secure
            </div>
            <p className="text-xs text-center text-base-content/40">
              © {new Date().getFullYear()} **LeaveFlow** · Tous droits réservés.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
