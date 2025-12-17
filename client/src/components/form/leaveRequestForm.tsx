import type { LeaveRequestType } from "../../typescript/requestLeave";

interface LeaveRequestFormProps {
  initialData?: LeaveRequestType | null;
  onSubmit: (data: Partial<LeaveRequestType>) => void;
}

const LeaveRequestForm = ({ initialData, onSubmit }: LeaveRequestFormProps) => {
  const isEdit = Boolean(initialData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSubmit({
      type: formData.get("type") as string,
      dateDebut: formData.get("dateDebut") as string,
      dateFin: formData.get("dateFin") as string,
      commentaire: formData.get("commentaire") as string,
    });

    e.currentTarget.reset();
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body space-y-4">
        <h2 className="text-xl font-bold">
          {isEdit
            ? "Modifier la LeaveRequestType"
            : "Nouvelle LeaveRequestType"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">Type de congé</label>
            <select
              name="type"
              defaultValue={initialData?.type ?? ""}
              className="select select-bordered"
              required
            >
              <option value="">-- Choisir --</option>
              <option value="maladie">Maladie</option>
              <option value="vacances">Vacances</option>
              <option value="absence">Absence</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="dateDebut"
              defaultValue={initialData?.dateDebut}
              className="input input-bordered"
              required
            />
            <input
              type="date"
              name="dateFin"
              defaultValue={initialData?.dateFin}
              className="input input-bordered"
              required
            />
          </div>

          <textarea
            name="commentaire"
            defaultValue={initialData?.commentaire}
            className="textarea textarea-bordered"
            placeholder="Commentaire (optionnel)"
          />

          <button className="btn btn-primary w-full">
            {isEdit ? "Mettre à jour" : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestForm;
