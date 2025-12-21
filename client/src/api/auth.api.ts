/**
 * API CALL: authentification
 */
export interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  role: "EMPLOYE" | "GESTIONNAIRE" | "ADMIN";
}

// LOGIN
export async function login(email: string, motDePasse: string) {
  const res = await fetch(
    `http://${window.location.hostname}:3000/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, motDePasse }),
    }
  );

  if (!res.ok) {
    throw new Error("Identifiants invalides");
  }

  return res.json();
}

// LOGOUT
export async function logout() {
  const res = await fetch(
    `http://${window.location.hostname}:3000/api/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la déconnexion");
  }
}

// GET CURRENT USER
export async function getMe(): Promise<User> {
  const res = await fetch(
    `http://${window.location.hostname}:3000/api/auth/me`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Utilisateur non authentifié");
  }

  return res.json();
}
