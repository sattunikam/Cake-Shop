import React, { useState, useEffect } from "react";
import { FaAlignJustify, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []); // फक्त एकदाच call होईल (on page load)

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/logout", {
        withCredentials: true,
      });
      setUser(null);
      toast.success("Logout Successfully"); // ✅ Toast first
      setTimeout(() => navigate("/login"), 500); // ⏳ 0.5s delay for toast
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  return (
    <>
      <div
        className={`w-full z-50 top-0 transition-all duration-500 ease-in-out ${
          isSticky
            ? "fixed bg-black/50 backdrop-blur-md opacity-100 translate-y-0"
            : "absolute bg-black/30 backdrop-blur-md -translate-y-1"
        }`}
      >
        <div className="flex h-20 justify-between text-white px-6 items-center container mx-auto">
          <h1 className="font-bold text-xl">
            <img
              className="w-[100%] h-[40px]"
              src="/Cake-Shop/logo.png"
              alt="logo"
            />
          </h1>

          {/* Desktop Menu */}
          <div className="hidden sm:block text-white font-bold space-x-8">
            <Link to="/" className="hover:text-amber-100">
              Home
            </Link>
            <Link to="/products" className="hover:text-amber-100">
              Products
            </Link>
            <Link to="/contact" className="hover:text-amber-100">
              Contact
            </Link>
            <Link to="/cart" className="hover:text-amber-100">
              <CustomizedBadges />
            </Link>
            {user && (
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="hover:text-amber-100"
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="hover:text-amber-100 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-amber-100">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaAlignJustify />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "max-h-500 py-4" : "max-h-0"
          } block sm:hidden bg-black/30 backdrop-blur-md space-y-4 w-full text-white overflow-hidden transition-all duration-300 ease-in-out text-center`}
        >
          <Link className="block px-4" to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            className="block px-4"
            to="/products"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            className="block px-4"
            to="/contact"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link to="/cart" className="hover:text-amber-100">
            <CustomizedBadges />
          </Link>
          {user ? (
            <>
              <Link
                className="block px-4"
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block mx-auto bg-white/30 backdrop-blur-md border border-white/20
             text-white px-6 py-2 rounded-xl font-medium 
             hover:bg-white/40 transition-all duration-300 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              className="block px-4"
              to="/login"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function CustomizedBadges() {
  const cartItems = useSelector((state) => state.cart.items);

  // total quantity count (correct logic)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={totalItems} sx={{ color: "white" }}>
        <ShoppingCartIcon className="text-white" />
      </StyledBadge>
    </IconButton>
  );
}

export default Header;
