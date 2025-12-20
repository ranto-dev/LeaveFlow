import type { LeaveRequestType } from "../typescript/requestLeave";

export async function postLeaveRequest(request: Partial<LeaveRequestType>) {
  await fetch(`http://${window.location.hostname}:3000/api/worker/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

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

export const editLeaveRequest = async (
  id: string,
  data: Partial<LeaveRequestType>
) => {
  await fetch(
    `http://${window.location.hostname}:3000/api/employee/leave/${id}`,
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

export const deleteLeaveRequest = async (id: string | undefined) => {
  const response = await fetch(
    `http://${window.location.hostname}:3000/api/employee/leave/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  export const getAllLeaveRequest = async () => {
    const response = await fetch(
      `http://${window.location.hostname}:3000/api/gestionnaire/conges`,
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

  export const treateLeaveRequest = async (
    _id: string | undefined,
    statut: {
      statut: string | undefined;
    }
  ) => {
    await fetch(
      `http://${window.location.hostname}:3000/api/gestionnaire/conge/${_id}`,
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

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la suppression");
  }
};
