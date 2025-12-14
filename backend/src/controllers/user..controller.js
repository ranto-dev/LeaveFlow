/**
 * controller pour la gestion d'utilisateur
 */

const User = require("../models/User");
const bcrypt = require("bcryptjs");

// CREATE: créer une utilisateur
exports.createUser = async (req, res) => {
  const { nom, prenom, email, adresse, motDePasse, role } = req.body;

  if (!nom || !prenom || !email || !adresse || !motDePasse || !role) {
    return res
      .status(400)
      .json({ message: "il y a un ou des données manquantes!" });
  }

  const hash = await bcrypt.hash(motDePasse, 10);

  try {
    const user = await User.create({
      nom,
      prenom,
      email,
      adresse,
      motDePasse: hash,
      role,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }

  res.end();
};

// GET: récupérer la liste des utilisateurs
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// GET: obtenir des informations d'un utilisateur par son ID
module.exports.findUserById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Paramètre ID absent" });
  }

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }

  res.end();
};

// PUT: modifier un utilisateur
module.exports.editUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ message: "Utilisateur non trouvé" });
  }

  try {
    const userUpdated = await User.findByIdAndUpdate(user, req.body, {
      new: false,
    });
    res.status(200).json(userUpdated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }

  res.end();
};

// DELETE: supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    return res.status(400).json({ message: "Utilisateur non trouvé!" });
  }

  try {
    await user.deleteOne();
    res.status(200).json({ message: "Utilisateur supprimé!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }

  res.end();
};
