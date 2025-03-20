const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../middleware/validateRequest");

const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login); // ✅ Login route

module.exports = router;
