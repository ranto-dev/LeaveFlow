const router = require("express").Router();
const {
  requestLeave,
  getAllMyLeaves,
  deleteLeave,
  editLeaveRequest,
} = require("../controllers/employee.controller.js");
const { protect } = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

router.use(protect, role("EMPLOYE"));
router.post("/request_leave", requestLeave);
router.get("/leaves", getAllMyLeaves);
router.put("/leave/:id", editLeaveRequest);
router.delete("/leave/:id", deleteLeave);

module.exports = router;
