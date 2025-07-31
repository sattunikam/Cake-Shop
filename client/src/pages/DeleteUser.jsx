import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteUser = () => {
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/delete`, {
        data: { reason }, // send reason in body
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success("Account deleted successfully");
        navigate("/"); // or to thank-you page
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-yellow-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-xl font-outfit font-bold text-red-600 mb-4">Delete Account</h2>
        <p className="text-gray-700 mb-4">
          We're sorry to see you go 😢 Please tell us why you're leaving. Our team will work to improve!
        </p>
        <textarea
          rows={4}
          placeholder="Your reason (optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full resize-none p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleDelete}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
