/**
 * API CALL: demande de congé
 */
import type { LeaveRequestType } from "../typescript/requestLeave";

// pour la création d'une nouvelle demande de congé
export async function postLeaveRequest(request: Partial<LeaveRequestType>) {
  await fetch(
    `http://${window.location.hostname}:3000/api/worker/leave/request`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(request),
    }
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// pour la récupération de toute la liste des demandes de congé
export const getAllLeaveRequest = async (userRole: string) => {
  const response = await fetch(
    `${
      userRole === "ADMIN"
        ? `http://${window.location.hostname}:3000/api/admin/leaves/all`
        : `http://${window.location.hostname}:3000/api/manager/leaves/all`
    }`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des demandes");
  }

  return response.json();
};

// pour récupérer tous les demandes de congé de l'utilisateur courrant
export async function getMyLeaveRequests(): Promise<LeaveRequestType[]> {
  const response = await fetch(
    `http://${window.location.hostname}:3000/api/worker/leaves`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des demandes");
  }

  return response.json();
}

// pour mettre à jour et modifier une demande de congé
export const editLeaveRequest = async (
  id: string,
  data: Partial<LeaveRequestType>
) => {
  await fetch(
    `http://${window.location.hostname}:3000/api/worker/leave/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

// traitement d'une demande de congé
export const treateLeaveRequest = async (
  _id: string | undefined,
  statut: {
    statut: string | undefined;
  }
) => {
  await fetch(
    `http://${window.location.hostname}:3000/api/manager/leave/treate/${_id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(statut),
    }
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

// pour supprimer une demande de congé
export const deleteLeaveRequest = async (id: string | undefined) => {
  const response = await fetch(
    `http://${window.location.hostname}:3000/api/worker/leave/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la suppression");
  }
};
