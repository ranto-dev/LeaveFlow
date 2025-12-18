import type { LeaveRequestType } from "../typescript/requestLeave";

export async function postLeaveRequest(request: Partial<LeaveRequestType>) {
  await fetch(
    `http://${window.location.hostname}:3000/api/employee/request_leave`,
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

export async function getMyLeaveRequests(): Promise<LeaveRequestType[]> {
  const response = await fetch(
    `http://${window.location.hostname}:3000/api/employee/leaves`,
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
