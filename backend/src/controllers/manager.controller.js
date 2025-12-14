const Leave = require("../models/LeaveRequest");

module.exports.toutesDemandes = async (req, res) => {
  const { statut, sort } = req.query;

  const filtre = {};

  if (statut) {
    filtre.statut = statut;
  }

  const demandes = await Leave.find(filtre)
    .sort(sort === "date" ? { dateDebut: -1 } : {})
    .populate("employe", "nom email");

  res.json(demandes);
};

module.exports.traiterDemande = async (req, res) => {
  const { statut } = req.body;
  const demande = await Leave.findByIdAndUpdate(
    req.params.id,
    { statut },
    { new: true }
  );
  res.json(demande);
};
