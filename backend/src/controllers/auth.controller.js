const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ message: "Utilisateur introuvable" });

  const isValid = await bcrypt.compare(motDePasse, user.motDePasse);
  if (!isValid)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};
