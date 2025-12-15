const Leave = require("../models/LeaveRequest");

module.exports.getAllLeaveRequest = async (req, res) => {
  const { statut, sort } = req.query;
  const filtre = {};

  if (statut) {
    filtre.statut = statut;
  }

  try {
    const demandes = await Leave.find(filtre)
      .sort(sort === "date" ? { dateDebut: -1 } : {})
      .populate("employe", "nom email");
    res.json(demandes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }

  res.end();
};

module.exports.treateRequest = async (req, res) => {
  const { statut } = req.body;
  const id = req.params.id;

  try {
    const demande = await Leave.findById(id).populate("employe");

    if (!demande || demande.statut !== "EN_ATTENTE") {
      return res
        .status(400)
        .json({
          message: "Impossible d'effectuer une traitement sur cette demande",
        });
    }

    demande.statut = statut;
    await demande.save();

    if (statut === "ACCEPTEE") {
      const jours =
        (demande.dateFin - demande.dateDebut) / (1000 * 60 * 60 * 24) + 1;

      demande.employe.soldeConges -= jours;
      await demande.employe.save();
    }

    res.json(demande);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }

  res.end();
};
