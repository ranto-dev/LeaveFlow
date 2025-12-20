import { useEffect, useState } from "react";
import LeaveRequestForm from "../../components/form/leaveRequestForm";
import Modal from "../../components/Modal";
import type { LeaveRequestType } from "../../typescript/requestLeave";
import LeaveRequestList from "./LeaveRequestList";
import {
  editLeaveRequest,
  getMyLeaveRequests,
  postLeaveRequest,
} from "../../api/employe";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { deleteLeaveRequest } from "../../api/employe";

const EmployeeDashboard = () => {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequestType[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [editing, setEditing] = useState<LeaveRequestType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState<LeaveRequestType | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const confirmDelete = async () => {
    if (!deleting) return;

    try {
      setDeleteLoading(true);
      await deleteLeaveRequest(deleting?._id);
      setDeleting(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  const handleCreate = (data: Partial<LeaveRequestType>) => {
    postLeaveRequest(data);
    window.location.reload();
  };

  const handleUpdate = (data: Partial<LeaveRequestType>) => {
    editLeaveRequest(editing?._id, data);
    setEditing(null);
    window.location.reload();
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
      <div className="container space-y-10 m-auto my-4 border border-neutral-500/20 shadowzy rounded-xl  p-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Employé</h1>
            <p className="mt-4">Soumission et suivi de vos congés.</p>
          </div>
          <div>
            <button onClick={openCreateModal} className="btn btn-primary">
              Demander un congé
            </button>
          </div>
          
        </div>

        <LeaveRequestList
          leaveRequest={leaveRequest}
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
