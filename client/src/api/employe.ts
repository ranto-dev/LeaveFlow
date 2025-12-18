import type { LeaveRequestType } from "../typescript/requestLeave";

/**
 * CALL API:  UNE NOUVELLE DEMANDE DE CONGE
 */
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
