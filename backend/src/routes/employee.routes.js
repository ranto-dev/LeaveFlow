const router = require("express").Router();
const { requestLeave, getAllMyLeaves, deleteLeave } = require("../controllers/employee.controller.js");
const { protect } = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

router.use(protect, role("EMPLOYE"));
router.post("/conge", requestLeave);
router.get("/conges", getAllMyLeaves);
router.delete("/conge/:id", deleteLeave);

module.exports = router;
