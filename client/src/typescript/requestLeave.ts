export type StatutDemande = "EN_ATTENTE" | "ACCEPTEE" | "REFUSEE";

export type LeaveRequestType = {
  _id: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  commentaire?: string;
  statut: StatutDemande;
  createdAt: string;
};
