import { useState } from "react";
import { FaAlignJustify, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isopen, setisopen] = useState(false);

  return (
    <nav className="bg-purple-600 text-white font-bold text-2xl fixed w-full z-50 top-0">
      <div className="h-20 flex items-center justify-between px-6 container mx-auto sm:px-12">
        <div>Logo</div>

        {/* Desktop View Links */}
        <div className="space-x-4 hidden sm:flex text-[18px]">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Testimonials</a>
        </div>

        {/* Toggle Button */}
        <button
          className="block sm:hidden cursor-pointer"
          onClick={() => setisopen(!isopen)}
        >
          {isopen ? <FaTimes /> : <FaAlignJustify />}
        </button>
      </div>

      {/* Mobile View Menu */}
      <div
        className={`${
          isopen ? "max-h-60 py-4" : "max-h-0"
        } sm:hidden bg-gray-700 text-amber-500 overflow-hidden space-y-4 transition-all duration-300 ease-in-out`}
      >
        <a href="#" className="block px-4">
          Home
        </a>
        <a href="#" className="block px-4">
          About
        </a>
        <a href="#" className="block px-4">
          Contact
        </a>
        <a href="#" className="block px-4">
          Testimonials
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
