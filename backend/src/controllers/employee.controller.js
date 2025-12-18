const Leave = require("../models/LeaveRequest");
const User = require("../models/User.js");

// POST: demander un congé
module.exports.requestLeave = async (req, res) => {
  const { type, dateDebut, dateFin, commentaire } = req.body;
  const userId = req.user.id;

  if (!type || !dateDebut || !dateFin || !commentaire) {
    return res
      .status(400)
      .json({ message: "il y a un ou des données manquantes!" });
  }

  const jours =
    (new Date(dateFin) - new Date(dateDebut)) / (1000 * 60 * 60 * 24) + 1;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "utilisateur introuvable!" });
    }

    if (jours > user.soldeConges) {
      return res.status(400).json({ message: "Solde insuffisant" });
    }

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
    res.status(500).json({ message: "Erreur interne du serveur" });
  }

  res.end();
};

// GET: Récupérer la list des congés de l'utlisateur courrante
module.exports.getAllMyLeaves = async (req, res) => {
  const userId = req.user.id;

  try {
    const leaves = await Leave.find({ employe: userId });
    res.status(200).json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }

  res.end();
};

// DELETE: Annuler la demande d'un congé
module.exports.deleteLeave = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Préciser le champ ID" });
  }

  try {
    await Leave.deleteOne({
      _id: req.params.id,
      employe: userId,
      statut: "EN_ATTENTE",
    });
    res.json({ message: "Demande de congé supprimée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }

  res.end();
};
