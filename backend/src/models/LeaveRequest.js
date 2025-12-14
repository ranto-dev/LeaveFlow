/**
 * Model qui correspond à la collection "Demande de congé"
 */
const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["maladie", "vacances", "absence"],
    required: true,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  commentaire: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    enum: ["EN_ATTENTE", "ACCEPTEE", "REFUSEE"],
    default: "EN_ATTENTE",
  },
  create: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LeaveRequest", leaveSchema);
