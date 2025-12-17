import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import type { LeaveRequestType } from "../../typescript/requestLeave";

type LeaveRequestListProps = {
  leaveRequest: LeaveRequestType[];
  onEdit: (demande: LeaveRequestType) => void;
};

const LeaveRequestList = ({ leaveRequest, onEdit }: LeaveRequestListProps) => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      {leaveRequest.length === 0 ? (
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
            {leaveRequest.map((request: LeaveRequestType, index: number) => {
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
                      disabled={request.statut !== "EN_ATTENTE" ? true : false}
                    >
                      <MdEdit />
                    </button>

                    <button className="btn btn-error text-white">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveRequestList;
