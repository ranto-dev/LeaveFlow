/**
 * route pour la gestion d'authentification
 */

const router = require("express").Router();
const { login, logout, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware.js");

// route pour la création d'une connexion
router.post("/login", login);

// route pour la récupération de l'utilisateur courrante
router.get("/me", protect, getMe);

// route pour la déconnexion
router.post("/logout", logout);

module.exports = router;
