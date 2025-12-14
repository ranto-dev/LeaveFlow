const {
  createUser,
  getAllUsers,
  findUserById,
  editUserById,
  deleteUser,
} = require("../controllers/user..controller.js");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", findUserById);
router.put("/:id", editUserById);
router.delete("/:id", deleteUser);

module.exports = router;
