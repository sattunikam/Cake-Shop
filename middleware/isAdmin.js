const isAdmin = (request, response, next) => {
  const user = request.user; // set by verifyToken
  if (user && user.role === "admin") {
    next();
  } else {
    response.status(403).json({ message: "Access Denied. Admins only." });
  }
};

module.exports = isAdmin;
