// ✅ src/components/FloatingCartButton.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const FloatingCartButton = () => {
  const cartItems = useSelector((state) => state.cart.items || []);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        zIndex: 1000,
      }}
    >
      <Badge badgeContent={totalItems} color="error">
        <Fab
          onClick={() => navigate("/cart")}
          sx={{
            background: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
            color: "white",
            width: "60px",
            height: "60px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            "&:hover": {
              background: "linear-gradient(135deg, #d97706 0%, #92400e 100%)",
            },
            transition: "0.3s",
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: "28px" }} />
        </Fab>
      </Badge>
    </div>
  );
};

export default FloatingCartButton;
