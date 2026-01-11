/**
 * Composant: Formulaire de création et de modification d'une demande de congé
 */
import { useForm } from "react-hook-form";
import type { LeaveRequestType } from "../../@types/requestLeave";

type LeaveRequestFormData = Pick<
  LeaveRequestType,
  "type" | "dateDebut" | "dateFin" | "commentaire"
>;

interface LeaveRequestFormProps {
  initialData?: LeaveRequestType | null;
  onSubmit: (data: LeaveRequestFormData) => void;
}

const LeaveRequestForm = ({ initialData, onSubmit }: LeaveRequestFormProps) => {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeaveRequestFormData>({
    defaultValues: {
      type: initialData?.type ?? "",
      dateDebut: initialData?.dateDebut ?? "",
      dateFin: initialData?.dateFin ?? "",
      commentaire: initialData?.commentaire ?? "",
    },
  });

  const onFormSubmit = (data: LeaveRequestFormData) => {
    onSubmit(data);

    if (!isEdit) {
      reset();
    }
  };

  return (
    <div className="card bg-base-100">
      <div className="card-body space-y-4">
        <h2 className="text-xl text-center font-bold">
          {isEdit
            ? "Modifier la demande de congé"
            : "Nouvelle demande de congé"}
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label font-medium">Type de congé</label>
            <select
              className="select select-bordered w-full"
              {...register("type", { required: "Le type est requis" })}
            >
              <option value="">-- Choisir --</option>
              <option value="maladie">Maladie</option>
              <option value="vacances">Vacances</option>
              <option value="absence">Absence</option>
            </select>
            {errors.type && (
              <span className="text-error text-sm">{errors.type.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-medium">Date de début</label>
              <input
                type="date"
                className="input input-bordered w-full"
                {...register("dateDebut", {
                  required: "La date de début est requise",
                })}
              />
              {errors.dateDebut && (
                <span className="text-error text-sm">
                  {errors.dateDebut.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label font-medium">Date de fin</label>
              <input
                type="date"
                className="input input-bordered w-full"
                {...register("dateFin", {
                  required: "La date de fin est requise",
                })}
              />
              {errors.dateFin && (
                <span className="text-error text-sm">
                  {errors.dateFin.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label font-medium">Commentaire (optionnel)</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Ajouter un commentaire"
              {...register("commentaire", {
                required:
                  "Une commentaire est reauise pour votre demande de congé",
              })}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isEdit ? "Mettre à jour" : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestForm;
