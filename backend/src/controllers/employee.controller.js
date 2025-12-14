const Leave = require("../models/LeaveRequest");

module.exports.demanderConge = async (req, res) => {
  const leave = await Leave.create({
    ...req.body,
    employe: req.user.id,
  });
  res.status(201).json(leave);
};

module.exports.mesConges = async (req, res) => {
  const leaves = await Leave.find({ employe: req.user.id });
  res.json(leaves);
};

module.exports.supprimerConge = async (req, res) => {
  await Leave.deleteOne({ _id: req.params.id, statut: "EN_ATTENTE" });
  res.json({ message: "Demande supprimée" });
};
