/**
 * Espace pour les EMPLOYES
 */
import { useEffect, useState } from "react";
import LeaveRequestForm from "../../components/form/leaveRequestForm";
import Modal from "../../components/Modal";
import type { LeaveRequestType } from "../../@types/requestLeave";
import {
  editLeaveRequest,
  getMyLeaveRequests,
  postLeaveRequest,
} from "../../api/leave.api";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { deleteLeaveRequest } from "../../api/leave.api";
import AllLeaveRequestList from "../../components/dashboard/AllRequestList";
import { useAuth } from "../../context/AuthContext";
import { notify } from "../../utils/notify";

const EmployeeDashboard = () => {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequestType[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [editing, setEditing] = useState<LeaveRequestType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState<LeaveRequestType | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user } = useAuth();

  const openCreateModal = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEditModal = (request: LeaveRequestType) => {
    setEditing(request);
    setIsModalOpen(true);
  };

  const openDeleteModal = (request: LeaveRequestType) => {
    setDeleting(request);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  const handleCreate = async (data: Partial<LeaveRequestType>) => {
    const toastId = notify.loading("Envoye en cours ...");

    try {
      await postLeaveRequest(data);
      setTimeout(() => {
        notify.success("Demande de congé envoyée avec succès");
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
      notify.error("Erreur lors de l'envoi de la demande");
    }
  };

  const handleUpdate = async (data: Partial<LeaveRequestType>) => {
    const toastId = notify.loading("Modification en cours...");

    try {
      await editLeaveRequest(editing?._id as string, data);
      setEditing(null);
      setTimeout(() => {
        notify.success("Demande de congé modifié avec succès");
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
      notify.error("Erreur lors de la modification de la demande");
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    const toastId = notify.loading("suppression en cours ...");

    try {
      setDeleteLoading(true);
      await deleteLeaveRequest(deleting?._id);
      setDeleting(null);
      setTimeout(() => {
        notify.success("Demande de congé supprimé avec succès");
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
      notify.error("Erreur lors de la suppression du demande");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const loadLeaveRequests = async () => {
      try {
        const data = await getMyLeaveRequests();
        setLeaveRequest(data);
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    loadLeaveRequests();
  }, []);

  if (isLoaded === false) {
    return <div>loading ...</div>;
  }

  return (
    <>
      <div className="container space-y-10 m-auto my-4 border border-neutral-500/20 shadow rounded-xl  p-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Employé</h1>
            <p className="mt-4">Soumission et suivi de vos congés.</p>
          </div>
          <div className="flex justify-end items-center gap-4">
            <div>
              Votre solde actuel:{" "}
              <span
                className={`text-2xl ${
                  user?.soldeConges !== undefined && user?.soldeConges > 5
                    ? "text-primary"
                    : "text-warning"
                }`}
              >
                {user?.soldeConges !== undefined && user?.soldeConges > 10
                  ? null
                  : "0"}
                {user?.soldeConges}
              </span>
            </div>
            <button onClick={openCreateModal} className="btn btn-primary">
              Demander un congé
            </button>
          </div>
        </div>

        <AllLeaveRequestList
          userRole={user?.role as string}
          leaveRequests={leaveRequest}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <LeaveRequestForm
          initialData={editing}
          onSubmit={editing ? handleUpdate : handleCreate}
        />
      </Modal>
      <ConfirmDeleteModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />
    </>
  );
};

export default EmployeeDashboard;
