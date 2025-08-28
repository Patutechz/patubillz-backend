const Wallet = require("../models/walletModel");
const mongoose = require("mongoose");

// create new wallet
const createWallet = async (req, res) => {
  try {
    const userId = req.user._id;
    const wallet = await Wallet.create({ userId });
    res.status(200).json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.status(200).json({message : "wallet created"})
};

const fundWallet = async (req, res) => {
  // const { id } = req.params;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "No such wallet" });
  }

  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    {
      $inc: { balance: 100 },
    }
  );

  if (!wallet) {
    return res.status(400).json({ error: "No such wallet" });
  }

  res.status(200).json(wallet);
};

module.exports = {
  createWallet,
  fundWallet
};
