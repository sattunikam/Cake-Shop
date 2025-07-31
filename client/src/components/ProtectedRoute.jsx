import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/me`, {
        withCredentials: true,
      });

      const role = res.data.role;
      setIsAuthenticated(true);

      // 🚫 Block if user tries to access admin-only route
      if (adminOnly && role !== "admin") {
        return navigate("/not-authorized");
      }

      // 🚫 Block if admin tries to access user-only route
      if (userOnly && role === "admin") {
        return navigate("/admin"); // ✅ Redirect admin to admin dashboard
      }

    } catch (error) {
      setIsAuthenticated(false);
      document.cookie = "token=; Max-Age=0; path=/";
      navigate("/login");
    }
  };

  checkAuth();
}, [navigate, adminOnly, userOnly]);


  if (isAuthenticated === null) return <p>Loading...</p>;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
