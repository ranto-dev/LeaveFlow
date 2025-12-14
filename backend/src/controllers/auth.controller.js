const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnlty: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // une journée
};

module.exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ message: "Utilisateur introuvable" });

  const isValid = await bcrypt.compare(motDePasse, user.motDePasse);

  if (!isValid) {
    return res.status(401).json({ message: "Mot de passe incorrect", user });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  res.cookie("token", token, cookieOptions);
  res.json({ token, role: user.role });
};

module.exports.getMe = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logout = (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.status(200).json({ message: "Deconnection réussi!" });
};
