import type { LeaveRequestType } from "../../typescript/requestLeave";

type DemandeFormProps = {
  requestLeave?: LeaveRequestType | null;
};

const DemandeForm = ({ requestLeave }: DemandeFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let data = {};

    if (!requestLeave) {
      const formData = new FormData(event.currentTarget);
      data = {
        type: formData.get("type"),
        dateDebut: formData.get("dateDebut"),
        dateFin: formData.get("dateFin"),
        commentaire: formData.get("commentaire"),
      };
    }

    console.log(JSON.stringify(data));
    window.location.reload();
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="card bg-base-100 p-6 space-y-6">
        {/* Titre */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-base-content">
            Demande de congé
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Remplissez les informations ci-dessous
          </p>
        </div>

        {/* Type de congé */}
        <div className="form-control">
          <label className="label" htmlFor="type">
            <span className="label-text">Type de congé</span>
          </label>
          <select
            id="type"
            name="type"
            className="select select-bordered w-full"
            required
          >
            <option value="">-- Sélectionner --</option>
            <option value="maladie">Maladie</option>
            <option value="vacances">Vacances</option>
            <option value="absence">Absence</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label" htmlFor="dateDebut">
              <span className="label-text">Date de début</span>
            </label>
            <input
              type="date"
              id="dateDebut"
              name="dateDebut"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="dateFin">
              <span className="label-text">Date de fin</span>
            </label>
            <input
              type="date"
              id="dateFin"
              name="dateFin"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Commentaire */}
        <div className="form-control">
          <label className="label" htmlFor="commentaire">
            <span className="label-text">Commentaire (optionnel)</span>
          </label>
          <textarea
            id="commentaire"
            name="commentaire"
            rows={4}
            className="textarea textarea-bordered w-full"
            placeholder="Ajoutez un commentaire si nécessaire..."
          ></textarea>
        </div>

        {/* Bouton */}
        <div className="pt-2">
          <button type="submit" className="btn btn-primary w-full">
            Envoyer la demande
          </button>
        </div>
      </form>
    </div>
  );
};

export default DemandeForm;
