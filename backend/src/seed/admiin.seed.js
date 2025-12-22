const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "ADMIN" });

    if (adminExists) {
      console.log("Admin déjà existant");
      return;
    }

    const hashedPassword = await bcrypt.hash("ranto123", 10);

    const admin = await User.create({
      nom: "RAKOTONDRASOA",
      prenom: "Andriananandraina Aina Iarindranto",
      email: "rantoandrianandraina@gmail.com",
      adresse: "lot 1126-F108 Tsivatrinikamo",
      motDePasse: hashedPassword,
      role: "ADMIN",
    });

    console.log("Admin par défaut créé :", admin.email);
  } catch (error) {
    console.error("Erreur seed admin :", error);
  }
};

module.exports = seedAdmin;
