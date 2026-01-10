/**
 * Composant: Modal box pour traitement d'une demande de congé
 */
import type { LeaveRequestType } from "../@types/requestLeave";
import Modal from "./Modal";

type TreateRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<LeaveRequestType>) => void;
  request: LeaveRequestType;
};

const TreateRequestModal = ({
  isOpen,
  onClose,
  request,
  onSubmit,
}: TreateRequestModalProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(request);
    const formData = new FormData(event.currentTarget);

    if (request?._id !== null) {
      onSubmit({
        _id: request._id,
        statut: formData.get("statut") as string,
      });
    }

    event.currentTarget.reset();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 text-center bg-nuetral-500"
      >
        <h2 className="text-xl font-semibold text-primary">
          Traiter la demande
        </h2>

        <div>
          <label htmlFor="statut">Status</label>
          <select name="statut" id="statut" className="select select-bordered">
            <option value="">-- Choisir --</option>
            <option value="ACCEPTEE">ACCEPTEE</option>
            <option value="REFUSEE">REFUSEE</option>
          </select>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="btn btn-outline btn-light">
            Annuler
          </button>

          <button type="submit" className="btn btn-primary text-white">
            Confirmer
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TreateRequestModal;
