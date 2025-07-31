import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedCakes, setPurchasedCakes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getCustomerData();
      await fetchPurchasedCakes();
    };
    fetchData();
  }, []);

  const fetchPurchasedCakes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/my-purchases`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setPurchasedCakes(res.data.purchases);
      }
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  const getCustomerData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard`, {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {
        withCredentials: true,
      });
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-50 to-amber-100 py-10 px-4">
      <div className="container mx-auto bg-white rounded-3xl shadow-2xl mt-6 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <h1 className="text-3xl md:text-4xl font-outfit font-bold text-amber-700">
            🎂 Welcome to Your Dashboard
          </h1>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              to="/change-password"
              className="bg-white text-amber-700 border border-amber-700 px-4 py-2 rounded-lg hover:bg-amber-700 hover:text-white transition"
            >
              Change Password
            </Link>
            <button
              onClick={handleLogout}
              className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
            <Link
              to="/delete"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Delete Account
            </Link>
          </div>
        </div>

        {/* User Info */}
        {user ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow-md">
              <p className="text-xl font-semibold text-gray-800">👤 {user.name}</p>
              <p className="text-sm text-gray-600 mt-2">📧 {user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No user data found.</p>
        )}

        {/* Purchased Cakes */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-amber-700">
            🛒 Your Purchased Cakes
          </h2>

          {purchasedCakes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {purchasedCakes.map((cake, index) => (
                <div
                  key={index}
                  className="bg-white border flex flex-col justify-center items-center border-amber-200 rounded-xl p-8 shadow hover:shadow-lg transition"
                >
                  <img
                    src={cake.image}
                    alt={cake.cakeName}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {cake.cakeName}
                  </h3>
                  <p className="text-gray-600">₹{cake.amount}</p>
                  <p className="text-gray-600">Payment ID: {cake.paymentId}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(cake.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">You haven’t purchased any cakes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
