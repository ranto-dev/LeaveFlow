const router = require("express").Router();
const { login, logout, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware.js");

router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", logout);
module.exports = router;