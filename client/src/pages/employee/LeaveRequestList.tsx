import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import type { LeaveRequestType } from "../../typescript/requestLeave";
import { useMemo, useState } from "react";

type LeaveRequestListProps = {
  leaveRequests: LeaveRequestType[];
  onEdit: (request: LeaveRequestType) => void;
  onDelete: (request: LeaveRequestType) => void;
};

const LeaveRequestList = ({
  leaveRequests,
  onEdit,
  onDelete,
}: LeaveRequestListProps) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState<"dateDebut" | "dateFin">("dateDebut");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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
    <>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
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
          onChange={(e) => setSortKey(e.target.value as never)}
        >
          <option value="dateDebut">Date de début</option>
          <option value="dateFin">Date de fin</option>
        </select>

        <button
          className="btn btn-outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Tri : {sortOrder === "asc" ? "Ascendant ↑" : "Descendant ↓"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        {filteredLeaves.length === 0 ? (
          <p className="text-gray-500">Aucune demande enregistrée</p>
        ) : (
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
              {filteredLeaves.map(
                (request: LeaveRequestType, index: number) => {
                  return (
                    <tr key={index}>
                      <td> {request.type} </td>
                      <td> {request.dateDebut} </td>
                      <td> {request.dateFin} </td>
                      <td> {request.commentaire} </td>
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
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default LeaveRequestList;
