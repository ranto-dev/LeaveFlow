const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/manager.controller");

router.use(auth, role("GESTIONNAIRE"));
router.get("/conges", ctrl.toutesDemandes);
router.put("/conge/:id", ctrl.traiterDemande);

module.exports = router;
