const express = require("express");

// controller functions
const {
  payBill,
  getBillCategory,
  queryBill,
  getData,
  buyData,
  buyCable,
  verifyMeterNo,
  buyElectricity,
  verifySmartCard,
} = require("../controllers/billController");

const router = express.Router();

// get data  bill route
router.get("/get-data", getData);

// pay bill route
router.post("/buy-data", buyData);

// pay bill route
router.post("/verify-smart-card", verifySmartCard);

// pay bill route
router.post("/buy-cable", buyCable);

// pay bill route
router.post("/verify-meter", verifyMeterNo);

// pay bill route
router.post("/buy-meter", buyElectricity);

// pay bill route
router.post("/pay", payBill);

// query bill route
router.post("/query", queryBill);

// pay bill route
router.get("/", getBillCategory);

module.exports = router;
