/**
 * Route pour la gestion des utilisateurs
 * Accès: ADMIN seulement
 */

const {
  createUser,
  getAllUsers,
  findUserById,
  editUserById,
  deleteUser,
} = require("../controllers/user..controller.js");
const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware.js");

router.use(protect, role("ADMIN"));
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", findUserById);
router.put("/:id", editUserById);
router.delete("/:id", deleteUser);

module.exports = router;
