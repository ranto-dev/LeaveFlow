/**
 * Typage: demande de congé
 */
export type LeaveRequestType = {
  _id?: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  commentaire?: string;
  statut: string;
  createdAt: string;
  employe: {
    _id: string,
    nom: string,
    prenom: string,
    email: string,
    soldeConges: number
  }
};
