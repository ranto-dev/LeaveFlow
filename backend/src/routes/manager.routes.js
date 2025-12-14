const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const {
  getAllLeaveRequest,
  treateRequest,
} = require("../controllers/manager.controller.js");

router.use(protect, role("GESTIONNAIRE"));
router.get("/conges", getAllLeaveRequest);
router.put("/conge/:id", treateRequest);

module.exports = router;
