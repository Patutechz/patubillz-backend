const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  fundWallet,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// fund wallet route
router.patch("/fund", requireAuth, fundWallet);

module.exports = router;
