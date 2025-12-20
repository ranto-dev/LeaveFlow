import type { UserType } from "../../typescript/user";

interface UserFormProps {
  initialData?: UserType | null;
  onSubmit: (data: Partial<UserType>) => void;
}

const UserForm = ({ initialData, onSubmit }: UserFormProps) => {
  const isEdit = Boolean(initialData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSubmit({
      nom: formData.get("nom") as string,
      prenom: formData.get("prenom") as string,
      email: formData.get("email") as string,
      adresse: formData.get("adresse") as string,
      soldeConges: formData.get("soldeConges") as unknown as number,
      role: formData.get("role") as string,
    });
  };

  return (
    <div className="card bg-base-100">
      <div className="card-body space-y-4">
        <h2 className="text-xl font-bold">
          {isEdit ? "Modifier l'utilisateur" : "Nouvelle utilisateur"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              name="nom"
              id="nom"
              defaultValue={initialData?.nom}
              className="w-full border rounded-xl p-2"
            />
          </div>
          <div className="form-control">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              defaultValue={initialData?.prenom}
              className="w-full border rounded-xl p-2"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={initialData?.email}
              className="w-full border rounded-xl p-2"
            />
          </div>
          <div className="form-control">
            <label htmlFor="adresse">Adresse</label>
            <input
              type="text"
              name="adresse"
              id="adresse"
              defaultValue={initialData?.adresse}
              className="w-full border rounded-xl p-2"
            />
          </div>
          <div className="form-control">
            <label htmlFor="soldeConges">Solde de congé</label>
            <input
              type="number"
              name="soldeConges"
              id="soldeConges"
              defaultValue={initialData?.soldeConges}
              className="w-full border rounded-xl p-2"
            />
          </div>
          <div className="form-control">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              className="select select-bordered w-full border border-white rounded-xl p-2"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="GESTIONNAIRE">GESTIONNAIRE</option>
              <option value="EMPLOYE">EMPLOYE</option>
            </select>
          </div>
          {isEdit ? null : (
            <div className="form-control">
              <label htmlFor="motDePasse">Mot de passe</label>
              <input
                type="password"
                name="motDePasse"
                id="motDePasse"
                defaultValue={initialData?.motDePasse}
                className="w-full border rounded-xl p-2"
                placeholder="**********"
              />
            </div>
          )}

          <button className="btn btn-primary w-full">
            {isEdit ? "Mettre à jour" : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
