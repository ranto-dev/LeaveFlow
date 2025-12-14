const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/employee.controller");

router.use(auth, role("EMPLOYE"));
router.post("/conge", ctrl.demanderConge);
router.get("/conges", ctrl.mesConges);
router.delete("/conge/:id", ctrl.supprimerConge);

module.exports = router;
