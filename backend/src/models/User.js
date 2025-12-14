/**
 * Model qui correspond à la collection "utilisateur"
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    adresse: { type: String, required: true },
    motDePasse: { type: String, required: true },
    role: {
      type: String,
      enum: ["EMPLOYE", "GESTIONNAIRE", "ADMIN"],
      required: true,
    },
    soldeConges: { type: Number, default: 20 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
