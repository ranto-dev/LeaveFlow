import { useEffect, useState } from "react";
import DemandeForm from "../../components/form/demandeForm";
import Modal from "../../components/Modal";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import type { LeaveRequestType } from "../../typescript/requestLeave";

const EmployeeDashboard = () => {
  const [modal, setModal] = useState<{
    type: string;
    requestLeave: LeaveRequestType | null;
  }>({
    type: "",
    requestLeave: null,
  });
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequestType[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const openModal = (type: string, requestLeave: LeaveRequestType | null) => {
    setModal({ type, requestLeave });
  };

  const closeModal = () => {
    setModal({ type: "", requestLeave: null });
  };

  const renderModalContentEmploye = () => {
    const { type, requestLeave } = modal;

    if (!type) return null;

    switch (type) {
      case "ajouterDemandeConge":
        return <DemandeForm requestLeave={null} />;

      case "modifierDemande":
        return <DemandeForm requestLeave={requestLeave} />;

      default:
        return null;
    }
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
      <div className="container m-auto my-4 border border-neutral-500/20 shadowzy rounded-xl  p-10">
        {/**
         * content - header
         */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Employé</h1>
            <p className="mt-4">Soumission et suivi de vos congés.</p>
          </div>
          <div>
            <button
              onClick={() =>
                openModal({ type: "ajouterDemandeConge", requestLeave: null })
              }
              className="btn btn-primary"
            >
              Demander un congé
            </button>
          </div>
        </div>

        {/**
         * content: liste des demandes de congé
         */}
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Commentaire</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leaveRequest.map((request: LeaveRequestType, index: number) => {
                return (
                  <tr key={index}>
                    <td> {request.type} </td>
                    <td> {request.dateDebut} </td>
                    <td> {request.dateFin} </td>
                    <td> {request.commentaire} </td>
                    <td> {request.statut} </td>
                    <td className="flex justify-end gap-2">
                      <button
                        className="btn btn-primary flex justify-around items-center gap-1"
                        disabled={
                          request.statut !== "EN_ATTENTE" ? true : false
                        }
                      >
                        <MdEdit /> modifier
                      </button>

                      <button className="btn btn-error text-white flex justify-around items-center gap-1">
                        <FaTrash /> supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {
        <Modal isOpen={modal.type !== ""} onClose={closeModal}>
          {renderModalContentEmploye()}
        </Modal>
      }
    </>
  );
};

export default EmployeeDashboard;
