import Modal from "./Modal";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6 text-center bg-nuetral-500">
        <h2 className="text-xl font-semibold text-error">
          Confirmer la suppression
        </h2>

        <p className="text-white text-sm">
          Cette action est irréversible. Voulez-vous vraiment supprimer cette
          demande de congé ?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="btn btn-outline btn-light"
            disabled={loading}
          >
            Annuler
          </button>

          <button
            onClick={onConfirm}
            className="btn btn-error text-white"
            disabled={loading}
          >
            {loading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
