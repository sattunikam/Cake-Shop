const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const Customer = require("../models/CustomerModel");
const PurchasedCake = require("../models/purchasedCakeSchema");

// Admin-only test route
router.get("/admin-area", verifyToken, isAdmin, (req, res) => {
  res.send("Only admin can see this");
});

// Delete customer by ID (admin only)
router.delete("/user/:id", verifyToken, isAdmin, async (request, response) => {
  try {
    await Customer.findByIdAndDelete(request.params.id);
    response.json({ message: "Customer deleted by admin" });
  } catch (err) {
    response.status(500).json({ message: "Error deleting customer" });
  }
});

// Get all customers (admin only)
router.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await Customer.find().lean();

    const allPurchases = await PurchasedCake.find().lean();

    const usersWithPurchases = users.map((user) => {
      const userPurchases = allPurchases.filter(
        (purchase) => purchase.user.toString() === user._id.toString()
      );
      return {
        ...user,
        purchasedCakes: userPurchases,
      };
    });

    res.json({ users: usersWithPurchases });
  } catch (err) {
    console.error("Admin get users failed", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


module.exports = router;
