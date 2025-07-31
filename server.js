const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/CustomerRoutes");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/AdminRoutes");
const paymentRoutes = require("./routes/PaymentRoutes")
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const MONGO_URL = process.env.MONGO_URL;
const port = 3000;

// Proxy support for Render / production:
app.set('trust proxy', 1); // secure cookies + rate-limit IP detection

app.use(
  cors({
    origin: "https://sattunikam.github.io",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 मिनिटांची window
  max: 60,                 // त्या window मध्ये एका IP वरून max 100 requests
  message: "Too many requests, please try again later.",
});

// Security middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use("/api/admin", adminRoutes);//AdminRoutes.js
app.use("/api", routes);//CustomerRoutes.js
app.use("/api", paymentRoutes)//PaymentRoutes.js
app.use(limiter);

// Connect to DB
const dbstart = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB Successfully Connected");
  } catch (error) {
    console.log(error);
  }
};

dbstart();


// Not found handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// General error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
