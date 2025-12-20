import { MdEdit } from "react-icons/md";
import type { LeaveRequestType } from "../../typescript/requestLeave";

type AllLeaveRequestListProps = {
  leaveRequests: LeaveRequestType[];
  onTreate: (request: LeaveRequestType) => void;
};
const AllLeaveRequestList = ({
  leaveRequests,
  onTreate,
}: AllLeaveRequestListProps) => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      {leaveRequests.length === 0 ? (
        <p className="text-gray-500">Aucune demande enregistrée</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>NOM</th>
              <th>EMAIL</th>
              <th>SOLDE</th>
              <th>Type</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Commentaire</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request: LeaveRequestType, index: number) => {
              return (
                <tr key={index}>
                  <td>
                    {request.employe.nom} {request.employe.prenom}{" "}
                  </td>
                  <td>{request.employe.email}</td>
                  <td>{request.employe.soldeConges}</td>
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
                      className="btn btn-primary text-white"
                      disabled={request.statut !== "EN_ATTENTE" ? true : false}
                      onClick={() => onTreate(request)}
                    >
                      <MdEdit />
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

export default AllLeaveRequestList;
