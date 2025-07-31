const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const verifyToken = (request, response, next) => {
  const token = request.cookies.token;

  if (!token) {
    return response
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secret);
    request.user = decoded;
    next();
  } catch (error) {
    response.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
