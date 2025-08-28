const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    const { username, phone, balance, avatar } = user;

    // res.status(200).json({email, user, token})
    res.status(200).json({ email, username, phone, avatar, balance, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, username, phone, password } = req.body;

  try {
    const user = await User.signup(email, username, phone, password);

    // create a token
    const token = createToken(user._id);
    const { balance, avatar } = user;

    res.status(200).json({ email, username, balance, avatar, phone, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// fund a user
const fundWallet = async (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== "number") {
    return res.status(400).json({ error: "Amount must be a number" });
  }
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "No such User" });
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { balance: amount } },
      { new: true }
    );

    const { balance } = updateUser;

    if (!updateUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Wallet funded successfully", balance });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
  // try {
  //   const amount = Number(req.body.amount);
  //   if (amount <= 0) return res.status(400).json({ error: "Invalid amount" });

  //   req.user.balance += amount;
  //   await req.user.save();
  //   res.status(201).json({ message: "wallet funded" });
  // } catch (err) {}
};

module.exports = { signupUser, loginUser, fundWallet };
