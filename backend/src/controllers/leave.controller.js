/**
 * Controller pour la gestion de congé
 */
const Leave = require("../models/LeaveRequest");
const User = require("../models/User.js");

// POST: controller pour la création d'une demande de congé
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

// GET: controller pour la récupération de toute la liste des demandes de congé
module.exports.getAllLeaveRequest = async (req, res) => {
  try {
    const demandes = await Leave.find().populate(
      "employe",
      "nom prenom email soldeConges"
    );
    res.json(demandes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
  res.end();
};

// GET: conttoller pour la récupération de la liste des demandes de congé d'un utlisateur courrante
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

/**
 * PUT: controller pour la moficication d'une demande de congé
 * condition: si la statut de la demande est en ATTENTE
 */
module.exports.editLeaveRequest = async (req, res) => {
  const id = req.params.id;
  const { type, dateDebut, dateFin, commentaire } = req.body;
  const userId = req.user.id;
  const updates = {};

  if (type && dateDebut && dateFin && commentaire) {
    updates.type = type;
    updates.dateDebut = dateDebut;
    updates.dateFin = dateFin;
    updates.commentaire = commentaire;
    updates.employe = userId;
  }

  if (!id) {
    return res.status(400).json({ message: "Préciser le champ ID" });
  }

  try {
    const request = await Leave.findById(id);

    if (!request) {
      return res.status(400).json({ message: "Demande non trouvée!" });
    }

    const requestUpdated = await Leave.findByIdAndUpdate(id, updates, {
      new: false,
    });
    res.json(requestUpdated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }

  res.end();
};

// PUT: controller pour le traitement d'une demande de congé
module.exports.treateRequest = async (req, res) => {
  const { statut } = req.body;
  const id = req.params.id;

  try {
    const demande = await Leave.findById(id).populate("employe");

    if (!demande || demande.statut !== "EN_ATTENTE") {
      return res.status(400).json({
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

// DELETE: controller pour annuler et supprimer une demande de congé
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
