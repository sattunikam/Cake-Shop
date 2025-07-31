import React, { useState, useEffect } from "react";
import { FaAlignJustify, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // const publicPaths = ["/", "/products", "/contact", "/login", "/register"];

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // // Fetch logged-in user
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (publicPaths.includes(location.pathname)) return; // Skip on public routes

  //     try {
  //       const res = await axios.get("http://localhost:3000/api/me", {
  //         withCredentials: true,
  //       });
  //       setUser(res.data);
  //     } catch (err) {
  //       if (err.response?.status === 401) {
  //         setUser(null); // Not logged in, silently handle
  //       } else {
  //         console.error("Unexpected error in /me:", err);
  //       }
  //     }
  //   };

  //   fetchUser();
  // }, [location.pathname]);


  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/me`, {
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
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
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
                className="hover:text-amber-100"
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
            isOpen ? "max-h-60 py-4" : "max-h-0"
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
                className="block px-4 text-red-300"
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

export default Header;
