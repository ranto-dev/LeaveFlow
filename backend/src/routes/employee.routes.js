/**
 * routes pour les employés
 */
const router = require("express").Router();
const {
  requestLeave,
  getAllMyLeaves,
  editLeaveRequest,
  deleteLeave,
} = require("../controllers/leave.controller.js");
const { protect } = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// définition du droit d'accès et role
router.use(protect, role("EMPLOYE"));

// route pour la création d'une demande de congé
router.post("/request", requestLeave);

// route poure la récupération pour la récupération de la liste des demandes de congé d'un emplyé spécifique
router.get("/leaves", getAllMyLeaves);

// route pour la mise à jour d'une demande de congé
router.put("/leave/:id", editLeaveRequest);

// route pour la suppression d'une demande de congé
router.delete("/leave/:id", deleteLeave);

module.exports = router;
