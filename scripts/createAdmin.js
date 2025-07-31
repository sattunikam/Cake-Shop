// scripts/createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/CustomerModel");
require("dotenv").config()
const password = process.env.ADMIN_PASS;

const MONGO_URL = process.env.MONGO_URL;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ DB Connected");

    const existing = await User.findOne({ email: "satyajeetnikam27@gmail.com" });
    if (existing) {
      console.log("⚠️ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Admin",
      email: "satyajeetnikam27@gmail.com",
      password: hashedPassword,
      role: "admin",
      
    });

    console.log("✅ Admin user created successfully");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 DB Disconnected");
  }
};

createAdmin();
