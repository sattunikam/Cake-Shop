import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-500  pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h1 className="text-3xl font-bold text-pink-600">Cake Bliss</h1>
          <p className="mt-4">
            Delight your taste buds with our freshly baked cakes, pastries, and
            sweet treats – made with love for every celebration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-pink-700 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 ">
            <li>
              <Link
                to="/"
                className="hover:text-pink-600 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-pink-600 transition duration-300"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-pink-600 transition duration-300"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                className="hover:text-pink-600 transition duration-300"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-pink-700 mb-4">
            Contact Us
          </h3>
          <p className="hover:text-pink-500">
            <a href="https://maps.app.goo.gl/rbMEBRGSnzf3khT88">
              📍 123 Sweet Street, Cake City
            </a>
          </p>
          <p className="mt-2 hover:text-pink-500">
            <a href="tel:+91 98765 43210">📞 +91 98765 43210</a>
          </p>
          <p className="mt-2 hover:text-pink-500">
            <a href="mailto:hello@cakebliss.com">📧 hello@cakebliss.com</a>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-pink-700 mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className=" hover:text-pink-500">
              <FaFacebookF />
            </a>
            <a href="#" className=" hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className=" hover:text-pink-500">
              <FaTwitter />
            </a>
            <a href="#" className=" hover:text-pink-500">
              <FaPinterestP />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-pink-500">Cake Bliss</span>. Made with ❤️ for your
        sweet moments.
      </div>
    </footer>
  );
};

export default Footer;
