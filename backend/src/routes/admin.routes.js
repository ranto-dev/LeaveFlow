/**
 * Route pour les administrateurs de l'application
 */

const { getAllLeaveRequest } = require("../controllers/leave.controller.js");
const {
  createUser,
  getAllUsers,
  findUserById,
  editUserById,
  deleteUser,
} = require("../controllers/user..controller.js");
const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware.js");
const role = require("../middlewares/role.middleware.js");

// définition du droit d'accès et role
router.use(protect, role("ADMIN"));

// route pour la création d'un nouvel utilisateur
router.post("/user/create", createUser);

// route pour la récupération de toute les utilisateurs
router.get("/users/all", getAllUsers);

// route pour récupérer un utilisateur particulier
router.get("/user/find/:id", findUserById);

// route pour la modification des informations d'un utilisateur
router.put("/user/edit/:id", editUserById);

// route pour la suppression d'un utilisateur
router.delete("/user/delete/:id", deleteUser);

// route pour la récupération de la liste des demandes de congé
router.get("/leaves/all", getAllLeaveRequest);

module.exports = router;
