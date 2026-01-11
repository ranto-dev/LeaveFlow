/**
 * Composant: formulaire d'ajout et de modification d'un utilisateur
 */
import { useForm } from "react-hook-form";
import type { UserType } from "../../@types/user";

type UserFormData = {
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  soldeConges: number;
  role: "ADMIN" | "GESTIONNAIRE" | "EMPLOYE";
  motDePasse: string;
};

interface UserFormProps {
  initialData?: UserType | null;
  onSubmit: (data: Partial<UserType>) => void;
}

const UserForm = ({ initialData, onSubmit }: UserFormProps) => {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    defaultValues: {
      nom: initialData?.nom ?? "",
      prenom: initialData?.prenom ?? "",
      email: initialData?.email ?? "",
      adresse: initialData?.adresse ?? "",
      soldeConges: initialData?.soldeConges ?? 20,
      role: (initialData?.role as UserFormData["role"]) ?? "EMPLOYE",
    },
  });

  const onFormSubmit = (data: UserFormData) => {
    if (isEdit) {
      // ⚠️ ne jamais envoyer le mot de passe en modification
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { motDePasse, ...updateData } = data;
      onSubmit(updateData);
    } else {
      onSubmit(data);
      reset({
        nom: "",
        prenom: "",
        email: "",
        adresse: "",
        soldeConges: 20,
        role: "EMPLOYE",
        motDePasse: "",
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body space-y-4">
        <h2 className="text-xl font-bold">
          {isEdit ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* NOM */}
          <div className="form-control">
            <label className="label font-medium">Nom</label>
            <input
              className="input input-bordered"
              {...register("nom", { required: "Le nom est requis" })}
            />
            {errors.nom && (
              <span className="text-error text-sm">{errors.nom.message}</span>
            )}
          </div>

          {/* PRENOM */}
          <div className="form-control">
            <label className="label font-medium">Prénom</label>
            <input
              className="input input-bordered"
              {...register("prenom", { required: "Le prénom est requis" })}
            />
            {errors.prenom && (
              <span className="text-error text-sm">
                {errors.prenom.message}
              </span>
            )}
          </div>

          {/* EMAIL */}
          <div className="form-control">
            <label className="label font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email invalide",
                },
              })}
            />
            {errors.email && (
              <span className="text-error text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* ADRESSE */}
          <div className="form-control">
            <label className="label font-medium">Adresse</label>
            <input
              className="input input-bordered"
              {...register("adresse", { required: true })}
            />
          </div>

          {/* SOLDE */}
          <div className="form-control">
            <label className="label font-medium">Solde de congés</label>
            <input
              type="number"
              className="input input-bordered"
              {...register("soldeConges", {
                valueAsNumber: true,
                min: { value: 0, message: "Solde invalide" },
              })}
            />
          </div>

          {/* ROLE */}
          <div className="form-control">
            <label className="label font-medium">Rôle</label>
            <select className="select select-bordered" {...register("role")}>
              <option value="ADMIN">ADMIN</option>
              <option value="GESTIONNAIRE">GESTIONNAIRE</option>
              <option value="EMPLOYE">EMPLOYE</option>
            </select>
          </div>

          {/* MOT DE PASSE */}
          {!isEdit && (
            <div className="form-control">
              <label className="label font-medium">Mot de passe</label>
              <input
                type="password"
                className="input input-bordered"
                {...register("motDePasse", {
                  required: "Mot de passe requis",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 caractères",
                  },
                })}
              />
              {errors.motDePasse && (
                <span className="text-error text-sm">
                  {errors.motDePasse.message}
                </span>
              )}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isEdit ? "Mettre à jour" : "Créer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
