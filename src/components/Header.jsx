import React, { useState, useEffect } from "react";
import { FaAlignJustify, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`w-full z-50 top-0 ${
          isSticky
            ? "fixed bg-black/50 backdrop-blur-md"
            : "absolute bg-black/30 backdrop-blur-md"
        } transition-all duration-500 ease-in-out `}
      >
        <div className="flex h-20 justify-between text-white px-6 items-center container mx-auto">
          <h1 className="font-bold text-xl">Logo</h1>

          <div className="hidden sm:block text-white font-bold space-x-8">
            <a className="hover:text-amber-100" href="">
              Home
            </a>
            <a className="hover:text-amber-100" href="#about">
              About
            </a>
            <a className="hover:text-amber-100" href="#testimonials">
              Testimonials
            </a>

            <a className="hover:text-amber-100" href="#contact">
              Contact
            </a>
          </div>

          <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaAlignJustify />}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "max-h-60 py-4" : "max-h-0"
          } block sm:hidden bg-black/30 backdrop-blur-md space-y-4 w-full text-white overflow-hidden transition-all duration-300 ease-in-out text-center`}
        >
          <a className="block px-4" href="">
            Home
          </a>
          <a className="block px-4" href="#about">
            About
          </a>
          <a className="block px-4" href="#testimonials">
            Testimonials
          </a>
          <a className="block px-4" href="#contact">
            Contact
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
