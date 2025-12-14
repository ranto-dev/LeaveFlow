const Leave = require("../models/LeaveRequest");

module.exports.requestLeave = async (req, res) => {
  const { type, dateDebut, dateFin, commentaire } = req.body;
  const userId = req.user.id;

  if (!type || !dateDebut || !dateFin || !commentaire) {
    return res
      .status(400)
      .json({ message: "il y a un ou des données manquantes!" });
  }

  try {
    const leave = await Leave.create({
      type,
      dateDebut,
      dateFin,
      commentaire,
      employe: userId,
    });
    res.status(201).json(leave);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du server" });
  }

  res.end();
};

module.exports.getAllMyLeaves = async (req, res) => {
  const userId = req.user.id;

  try {
    const leaves = await Leave.find({ employe: userId });
    res.status(200).json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du server" });
  }

  res.end();
};

module.exports.deleteLeave = async (req, res) => {
  await Leave.deleteOne({ _id: req.params.id, statut: "EN_ATTENTE" });
  res.json({ message: "Demande supprimée" });
};
