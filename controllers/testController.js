require("dotenv").config();
const axios = require("axios");
const User = require("../models/userModel");

// Fund wallet
const fundWallet = async (req, res) => {
  try {
    const { email, amount } = req.body;

    // Convert to kobo (Paystack uses lowest currency unit)
    const paystackAmount = amount * 100;
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: paystackAmount,
        callback_url:
          "https://patubillz-backend.onrender.com/api/test/callback/paystack",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      status: true,
      message: "Authorization URL created",
      data: response.data.data,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
};

// verify transaction
const webhook = async (req, res) => {
  try {
    const event = req.body;

    if (event.event === "charge.success") {
      const { email, amount } = event.data.customer;
      const paidAmount = event.data.amount / 100;

      const user = await User.findOne({ email: event.data.customer.email });

      if (user) {
        user.balance += paidAmount;
        await user.save();
        console.log(`Wallet funded: ${user.email} -> ₦${paidAmount}`);
      }
    }

    res.sendStatus(200); // Acknowledge receipt
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const callback = async (req, res) => {
  try {
    const reference = req.query.reference;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, data } = response.data;

    if (status && data.status === "success") {
      const email = data.customer.email;
      const amount = data.amount / 100;

      const user = await User.findOne({ email });
      if (user) {
        user.balance += amount;
        await user.save();
      }

      return res.send(
        `<h2>✅ Payment Successful</h2><p>₦${amount} has been added to your wallet.</p>`
      );
    } else {
      return res.send(
        "<h2>❌ Payment Verification Failed</h2><p>Please try again.</p>"
      );
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.send("<h2>⚠️ Error verifying payment</h2>");
  }
};

// verify transaction
const verifyTransaction = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, data } = response.data;

    if (status && data.status === "success") {
      const email = data.customer.email;
      const amount = data.amount / 100;

      const user = await User.findOne({ email });
      if (user) {
        user.balance += amount;
        await user.save();
      }
    }

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Verification failed" });
  }
};

module.exports = { fundWallet, webhook, callback, verifyTransaction };
