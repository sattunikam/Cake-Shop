import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [form, setform] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newpassword !== form.conformpassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/change-password`,
        {
          currentpassword: form.currentpassword,
          password: form.newpassword,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Password Changed Successfully");
        setform({});
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-pink-600 mb-6 text-center font-outfit">
          Change Password
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={handleChange}
            value={form.currentpassword || ""}
            name="currentpassword"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={handleChange}
            name="newpassword"
            required
            value={form.newpassword || ""}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-2 mb-6 border border-gray-300 rounded"
            onChange={handleChange}
            name="conformpassword"
            required
            value={form.conformpassword || ""}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
