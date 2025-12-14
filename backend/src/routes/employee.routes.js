const router = require("express").Router();
const {
  requestLeave,
  getAllMyLeaves,
  deleteLeave,
} = require("../controllers/employee.controller.js");
const { protect } = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

router.use(protect, role("EMPLOYE"));
router.post("/request_leave", requestLeave);
router.get("/leaves", getAllMyLeaves);
router.delete("/leave/:id", deleteLeave);

module.exports = router;
