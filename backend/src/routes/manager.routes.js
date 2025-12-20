/**
 * route pour les gestionnaires
 */

const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const {
  getAllLeaveRequest,
  treateRequest,
} = require("../controllers/leave.controller.js");

// définition du droit d'accès aux routes et role
router.use(protect, role("GESTIONNAIRE"));

// route pour la récupération de la liste des demandes de congé
router.get("/leaves/all", getAllLeaveRequest);

// route pour le traitement d'une demande de congé
router.put("/leave/treate/:id", treateRequest);

module.exports = router;
