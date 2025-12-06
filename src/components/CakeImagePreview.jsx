import React from "react";
import { X } from "lucide-react"; // close icon

const CakeImagePreview = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition"
      >
        <X size={24} />
      </button>

      {/* Image */}
      <img
        src={image}
        alt="Cake Preview"
        className="max-w-[90%] max-h-[80%] object-contain rounded-lg shadow-lg 
        transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default CakeImagePreview;
