const express = require("express");
const CustomerModel = require("../models/CustomerModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

router.get("/dashboard", verifyToken, async (request, response) => {
  try {
    const user = await CustomerModel.findById(request.user._id).select(
      "-password"
    );
    response
      .status(200)
      .json({ message: "Customer Data Successfully fetched", user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Register Route
router.post("/register", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({ message: "All Fields Are Required" });
    }

    const existingCustomer = await CustomerModel.findOne({ email });

    if (existingCustomer) {
      return response.status(409).json({
        message: "Customer Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = new CustomerModel();
    customer.name = name;
    customer.email = email;
    customer.password = hashedPassword;
    await customer.save();
    response.status(201).json({ message: "Customer Registered Successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Login Route
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "Email and Password Required" });
    }

    const customer = await CustomerModel.findOne({ email });

    if (!customer) {
      return response.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return response.status(401).json({ message: "Invalid Credentials" });
    }

    // create jwt token
    const token = jwt.sign(
      { email: customer.email, _id: customer._id, role: customer.role },
      secret,
      {
        expiresIn: "7d",
      }
    );
    response
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // true if using HTTPS
        sameSite: "None", // or 'None' for cross-site cookies with HTTPS
      })
      .status(200)
      .json({ message: "Login Successful", role: customer.role });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.put("/change-password", verifyToken, async (request, response) => {
  try {
    const { currentpassword, password } = request.body;
    const user = await CustomerModel.findById(request.user._id);

    const isMatch = await bcrypt.compare(currentpassword, user.password);
    if (!isMatch) {
      return response
        .status(400)
        .json({ message: "Current password incorrect" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    response.clearCookie("token");
    response.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.delete("/delete", verifyToken, async (request, response) => {
  try {
    const userId = request.user._id;
    const reason = request.body.reason || "No reason provided";

    const deletedCustomer = await CustomerModel.findByIdAndDelete(userId);

    if (!deletedCustomer) {
      return response.status(404).json({ message: "Customer not found" });
    }

    console.log(`Deleted user ${deletedCustomer.email} for reason: ${reason}`);
    response.clearCookie("token");
    response.status(201).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message);
    response.status(500).json({ error: error.message });
  }
});

router.get("/logout", (request, response) => {
  response.clearCookie("token");
  response.status(200).json({ message: "Logout successful" });
});

// router.post("/buy", verifyToken, async (req, res) => {
//   const { name, image, price } = req.body;

//   try {
//     const user = await CustomerModel.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!name || !image || !price) {
//       return res.status(400).json({ message: "Invalid cake data" });
//     }

//     user.purchasedCakes.push({ name, image, price });
//     await user.save();

//     res.status(200).json({ message: "Cake added to dashboard" });
//   } catch (error) {
//     console.error("Buy error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await CustomerModel.findById(req.user._id).select("name email role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});


module.exports = router;
