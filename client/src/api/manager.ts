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
