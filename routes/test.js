const express = require("express");

// controller functions
const {
  fundWallet,
  verifyTransaction,
  callback,
} = require("../controllers/testController");

const router = express.Router();

// fund wallet
router.post("/fund", fundWallet);



// webhook
router.post("/webhook/paystack", express.json({ type : "*/*" }) , fundWallet);

// call back
router.get("/callback/paystack", callback);

// verify a transaction
router.get("/verify/:reference", verifyTransaction);

module.exports = router;

// http://localhost:4000/api/test/webhook/paystack
