/**
 * Composant : Tableau pour lister toutes les demandes de congé
 */

import { useMemo, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaHourglass, FaTrash } from "react-icons/fa6";
import Modal from "../Modal";
import type { LeaveRequestType } from "../../typescript/requestLeave";
type SortKey = "dateDebut" | "dateFin";

type AllLeaveRequestListProps = {
  leaveRequests: LeaveRequestType[];
  onEdit?: (request: LeaveRequestType) => void;
  onTreat?: (request: LeaveRequestType) => void;
  onDelete?: (request: LeaveRequestType) => void;
  userRole: string;
};

const AllLeaveRequestList = ({
  leaveRequests,
  onEdit,
  onTreat,
  onDelete,
  userRole,
}: AllLeaveRequestListProps) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("dateDebut");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalText, setModalText] = useState<string>("");

  const openModal = (request: LeaveRequestType) => {
    setModalText(request.commentaire ?? "");
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalText("");
  };

  const filteredLeaves = useMemo(() => {
    let result = [...leaveRequests];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter((l) =>
        `${l.employe?.nom ?? ""} ${l.employe?.prenom ?? ""}`
          .toLowerCase()
          .includes(s)
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
    <div className="flex flex-col gap-4">
      {userRole === "ADMIN" && (
        <h1 className="text-2xl font-bold">
          Liste globale des demandes de congé
        </h1>
      )}

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher par nom ou prénom"
          className="input input-bordered w-full md:w-64"
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
          onChange={(e) => setSortKey(e.target.value as SortKey)}
        >
          <option value="dateDebut">Date de début</option>
          <option value="dateFin">Date de fin</option>
        </select>

        <button
          className="btn btn-outline"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          Tri {sortOrder === "asc" ? "Ascendant" : "Descendant"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-base-content/10 bg-base-100">
        {filteredLeaves.length === 0 ? (
          <p className="p-4 text-gray-500">Aucune demande trouvée</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                {userRole !== "EMPLOYE" && (
                  <>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Solde</th>
                  </>
                )}
                <th>Type</th>
                <th>Date début</th>
                <th>Date fin</th>
                {userRole === "EMPLOYE" && <th>Commentaire</th>}
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredLeaves.map((request) => (
                <tr key={request._id}>
                  {userRole !== "EMPLOYE" && (
                    <>
                      <td>
                        {request.employe
                          ? `${request.employe.nom} ${request.employe.prenom}`
                          : "—"}
                      </td>
                      <td>{request.employe?.email ?? "—"}</td>
                      <td>{request.employe?.soldeConges ?? "—"}</td>
                    </>
                  )}

                  <td>{request.type}</td>
                  <td>{request.dateDebut}</td>
                  <td>{request.dateFin}</td>

                  {userRole === "EMPLOYE" && (
                    <td>{request.commentaire ?? "—"}</td>
                  )}

                  <td>
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
                    </span>
                  </td>

                  <td className="flex justify-end gap-2">
                    {userRole === "GESTIONNAIRE" && (
                      <>
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => openModal(request)}
                        >
                          Commentaire
                        </button>
                        <button
                          className="btn btn-sm btn-primary"
                          disabled={request.statut !== "EN_ATTENTE"}
                          onClick={() => onTreat?.(request)}
                        >
                          <FaHourglass />
                        </button>
                      </>
                    )}

                    {userRole === "EMPLOYE" && (
                      <>
                        <button
                          className="btn btn-sm btn-primary"
                          disabled={request.statut !== "EN_ATTENTE"}
                          onClick={() => onEdit?.(request)}
                        >
                          <MdEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          disabled={request.statut !== "EN_ATTENTE"}
                          onClick={() => onDelete?.(request)}
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-bold">Commentaire</h2>
          <p>{modalText}</p>
          <button className="btn btn-primary" onClick={closeModal}>
            Fermer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AllLeaveRequestList;
