import type { UserType } from "../typescript/user";

export const getAllUser = async () => {
  const response = await fetch(
    `http://${window.location.hostname}:3000/api/admin/users/all`,
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

export const createUser = async (user: Partial<UserType>) => {
  await fetch(`http://${window.location.hostname}:3000/api/admin/user/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const editUser = async (id: string, data: Partial<UserType>) => {
  await fetch(
    `http://${window.location.hostname}:3000/api/admin/user/edit/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const deleteUser = async (id: string) => {
  await fetch(
    `http://${window.location.hostname}:3000/api/admin/user/delete/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
