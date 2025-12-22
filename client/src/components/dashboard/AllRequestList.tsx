/**
 * Composant: Tableau pour lister les utiisateurs
 */
import { MdEdit } from "react-icons/md";
import { useMemo, useState } from "react";
import type { LeaveRequestType } from "../../typescript/requestLeave";
import { FaHourglass, FaTrash } from "react-icons/fa6";
import Modal from "../Modal";

type AllLeaveRequestListProps = {
  leaveRequests: LeaveRequestType[];
  onEdit?: (request: LeaveRequestType) => void;
  onTreate?: (request: LeaveRequestType) => void;
  onDelete?: (requst: LeaveRequestType) => void;
  userRole: string;
};
const AllLeaveRequestList = ({
  leaveRequests,
  onEdit,
  onTreate,
  onDelete,
  userRole,
}: AllLeaveRequestListProps) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState<"dateDebut" | "dateFin">("dateDebut");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalText, setModalText] = useState<string>("");

  const openModal = (request: LeaveRequestType) => {
    setIsOpenModal(true);
    setModalText(request.commentaire as string);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalText("");
  };

  const rendreContent = () => {
    if (modalText === "") {
      return null;
    }
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl text-center">Commentaire</h1>
        </div>
        <div className="text-center">
          <p>-- {modalText} --</p>
        </div>
        <div className="flex justify-center">
          <button onClick={closeModal} className="btn btn-primary">
            Fermer
          </button>
        </div>
      </div>
    );
  };

  const filteredLeaves = useMemo(() => {
    let result = [...leaveRequests];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter((l) =>
        `${l.employe?.nom} ${l.employe?.prenom}`.toLowerCase().includes(s)
      );
    }

    if (typeFilter) {
      result = result.filter((l) => l.type === typeFilter);
    }

    result.sort((a, b) => {
      const d1 = new Date(a[sortKey]).getTime();
      const d2 = new Date(b[sortKey]).getTime();
      return sortOrder === "asc" ? d1 - d2 : d2 - d1;
    });

    return result;
  }, [leaveRequests, search, typeFilter, sortKey, sortOrder]);

  return (
    <div className="flex flex-col gap-2">
      {userRole === "ADMIN" && (
        <div>
          <h1 className="text-2xl"># La liste des demandes de congé</h1>
        </div>
      )}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un nom ou un prénom"
          className="input input-bordered border-white w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">Tous les types</option>
          <option value="maladie">Maladie</option>
          <option value="vacances">Vacances</option>
          <option value="absence">Absence</option>
        </select>

        <select
          className="select select-bordered"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as never)}
        >
          <option value="soldeConges">Triage suivant les soldes</option>
          <option value="dateDebut">Triage suivant la date de début</option>
          <option value="dateFin">Triage suivant la date de fin</option>
        </select>

        <button
          className="btn btn-outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Triage {sortOrder === "asc" ? "Ascendant" : "Descendant"}
        </button>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        {leaveRequests.length === 0 ? (
          <p className="text-gray-500">Aucune demande enregistrée</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                {userRole !== "EMPLOYE" ? (
                  <>
                    <th>NOM</th>
                    <th>EMAIL</th>
                    <th>SOLDE</th>
                  </>
                ) : null}
                <th>Type</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                {userRole !== "EMPLOYE" ? null : <th>Commentaire</th>}
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map(
                (request: LeaveRequestType, index: number) => {
                  return (
                    <tr key={index}>
                      {userRole !== "EMPLOYE" ? (
                        <>
                          <td>
                            {request.employe.nom} {request.employe.prenom}{" "}
                          </td>
                          <td>{request.employe.email}</td>
                          <td>{request.employe.soldeConges}</td>
                        </>
                      ) : null}
                      <td> {request.type} </td>
                      <td> {request.dateDebut} </td>
                      <td> {request.dateFin} </td>
                      {userRole !== "EMPLOYE" ? null : (
                        <td> {request.commentaire} </td>
                      )}
                      <td>
                        {" "}
                        <span
                          className={`badge ${
                            request.statut === "EN_ATTENTE"
                              ? "badge-warning"
                              : request.statut === "ACCEPTEE"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {request.statut}
                        </span>{" "}
                      </td>
                      {userRole === "ADMIN" ? null : userRole ===
                        "GESTIONNAIRE" ? (
                        <td className="flex justify-end gap-2">
                          <button
                            className="btn btn-primary flex justify-center items-center text-white"
                            onClick={() => openModal(request)}
                          >
                            voir le commentaire
                          </button>
                          <button
                            className="btn btn-primary text-white"
                            disabled={
                              request.statut !== "EN_ATTENTE" ? true : false
                            }
                            onClick={() => onTreate(request)}
                          >
                            <FaHourglass />
                          </button>
                        </td>
                      ) : (
                        <td className="flex justify-end gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => onEdit(request)}
                            disabled={
                              request.statut !== "EN_ATTENTE" ? true : false
                            }
                          >
                            <MdEdit />
                          </button>

                          <button
                            className="btn btn-error text-white"
                            disabled={
                              request.statut !== "EN_ATTENTE" ? true : false
                            }
                            onClick={() => onDelete(request)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
        <Modal isOpen={isOpenModal} onClose={closeModal}>
          {rendreContent()}
        </Modal>
      </div>
    </div>
  );
};

export default AllLeaveRequestList;
