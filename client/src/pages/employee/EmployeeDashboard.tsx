import { useEffect, useState } from "react";
import LeaveRequestForm from "../../components/form/leaveRequestForm";
import Modal from "../../components/Modal";
import type { LeaveRequestType } from "../../typescript/requestLeave";
import LeaveRequestList from "./LeaveRequestList";

const EmployeeDashboard = () => {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequestType[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [editing, setEditing] = useState<LeaveRequestType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateModal = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEditModal = (request: LeaveRequestType) => {
    setEditing(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  const handleCreate = (data: Partial<LeaveRequestType>) => {
    console.log("Créer", data);
    // fetch POST /api/demandes
  };

  const handleUpdate = (data: Partial<LeaveRequestType>) => {
    console.log("Modifier", editing?._id, data);
    // fetch PUT /api/demandes/:id
    setEditing(null);
  };

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`http://${window.location.hostname}:3000/api/employee/leaves`, {
      method: "GET",
      credentials: "include",
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((response) => {
        setLeaveRequest(response);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(false);
        if (error.name === "AbortError") {
          console.log("Fetch annulé");
        } else {
          console.error("Erreur lors du fetch:", error);
        }
      });

    return () => {
      abortController.abort();
    };
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

        <LeaveRequestList leaveRequest={leaveRequest} onEdit={openEditModal} />
      </div>
      {
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <LeaveRequestForm
            initialData={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
          />
        </Modal>
      }
    </>
  );
};

export default EmployeeDashboard;
