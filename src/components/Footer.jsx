import React from "react";
import { FaInstagram, FaYoutube, FaFacebook, FaWhatsapp } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="bg-blue-950 py-4">
        <div className="container mx-auto flex flex-col space-y-4 justify-center items-center">
          <div className="flex space-x-4 flex-wrap justify-center items-center w-[82%] md:w-full">
            <div className="flex justify-center items-center text-white space-x-2">
              <i className="hover:text-amber-100 cursor-pointer">
                <FaInstagram />
              </i>
              <a
                href="#instagram"
                className="hover:text-amber-100 cursor-pointer"
              >
                Instagram
              </a>
            </div>

            <div className="flex justify-center items-center text-white space-x-2">
              <i className="hover:text-amber-100">
                <FaYoutube />
              </i>
              <a href="#youtube" className="hover:text-amber-100">
                Youtube
              </a>
            </div>

            <div className="flex justify-center items-center text-white space-x-2">
              <i className="hover:text-amber-100">
                <FaFacebook />
              </i>
              <a href="#facebook" className="hover:text-amber-100">
                Facebook
              </a>
            </div>

            <div className="flex justify-center items-center text-white space-x-2">
              <i className="hover:text-amber-100">
                <FaWhatsapp />
              </i>
              <a href="#whatsup" className="hover:text-amber-100">
                Whatsapp{" "}
              </a>
            </div>
          </div>
          <div>
            <p className="text-amber-100">Site Developed By Satya</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
