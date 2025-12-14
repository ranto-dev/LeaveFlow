const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Accès refusé" });

//   req.user = jwt.verify(token, process.env.JWT_SECRET);
//   next();
// };

module.exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Non authoriser, token invalide!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Non authoriser, utilisateur introuvable!" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Non authoriser, token invalide!" });
  }
};
