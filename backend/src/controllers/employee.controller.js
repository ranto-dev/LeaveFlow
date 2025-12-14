const Leave = require("../models/LeaveRequest");

module.exports.requestLeave = async (req, res) => {
  const leave = await Leave.create({
    ...req.body,
    employe: req.user.id,
  });
  res.status(201).json(leave);
};

module.exports.getAllMyLeaves = async (req, res) => {
  const leaves = await Leave.find({ employe: req.user.id });
  res.json(leaves);
};

module.exports.deleteLeave = async (req, res) => {
  await Leave.deleteOne({ _id: req.params.id, statut: "EN_ATTENTE" });
  res.json({ message: "Demande supprimée" });
};
