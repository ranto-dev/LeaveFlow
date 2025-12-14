const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Accès refusé" });

  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};
