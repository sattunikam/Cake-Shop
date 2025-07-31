const Razorpay = require("razorpay");
const crypto = require("crypto"); // ❗️You forgot this import
require("dotenv").config();
const express = require("express");
const router = express.Router();
const PurchasedCake = require("../models/purchasedCakeSchema");
const verifyToken = require("../middleware/verifyToken");

const instance = new Razorpay({
  key_id: process.env.TESTKEY_ID,
  key_secret: process.env.TESTKEY_SECRET,
});

// ✅ Create Razorpay Order
router.post("/create-order", verifyToken, async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, message: "Order failed" });
  }
});

// ✅ Verify Razorpay Payment & Save to DB
router.post("/verify-payment", verifyToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cakeName,
      image,
      amount,
    } = req.body;

    // Create signature for comparison
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.TESTKEY_SECRET) // ⚠️ match with Razorpay instance secret
      .update(sign.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    // Save to PurchasedCake DB
    const purchase = await PurchasedCake.create({
      user: req.user._id,
      cakeName: req.body.cakeName,
      image: req.body.image, // ✅ include image field here
      amount: req.body.amount,
      paymentId: req.body.razorpay_payment_id,
    });

    res.status(200).json({ success: true, purchase });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
});

router.get("/my-purchases", verifyToken, async (req, res) => {
  try {
    const purchases = await PurchasedCake.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, purchases });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch purchases" });
  }
});

module.exports = router;
