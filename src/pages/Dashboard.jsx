import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import OrderTimeline from "../components/OrderTimeline";
import { io } from "socket.io-client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedCakes, setPurchasedCakes] = useState([]);
  console.log(user?.userPhoto); // Should print filename

  // Load user data & purchases on mount
  useEffect(() => {
    const loadData = async () => {
      await getCustomerData();
      await fetchPurchasedCakes();
    };
    loadData();
  }, []);

  // ---------------- SOCKET SETUP ----------------
  useEffect(() => {
    if (!user?._id) return;

    const socket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("orderStatusUpdatedForUser", (data) => {
      if (data.userId === user._id) {
        setPurchasedCakes((prev) =>
          prev.map((cake) =>
            cake._id === data.orderId ? { ...cake, status: data.status } : cake
          )
        );
      }
    });

    return () => socket.disconnect();
  }, [user]);

  // ---------------- API CALLS ----------------
  const fetchPurchasedCakes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/my-purchases", {
        withCredentials: true,
      });
      if (res.data.success) setPurchasedCakes(res.data.purchases);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/dashboard", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      toast.error("Error loading dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/logout", {
        withCredentials: true,
      });
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (loading || !user) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-50 to-amber-100 py-14 px-4">
      <div className="container mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-700">
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
              className="bg-amber-700 cursor-pointer hover:bg-amber-800 text-white px-4 py-2 rounded-lg transition"
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
            <div className="bg-amber-50 flex flex-col gap-3 border border-amber-200 p-6 rounded-xl shadow-md">
              {user.userPhoto && (
                <img
                  src={`http://localhost:3000/uploads/${
                    user.userPhoto
                  }?t=${Date.now()}`}
                  alt="Profile"
                  className="rounded-full object-cover 
             w-20 h-20 
             sm:w-24 sm:h-24 
             md:w-28 md:h-28 
             lg:w-32 lg:h-32"
                />
              )}

              <div>
                <p className="text-xl font-semibold text-gray-800">
                  👤 {user.name}
                </p>
                <p className="text-sm text-gray-600">📧 {user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No user data found.
          </p>
        )}

        {/* Purchased Cakes */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-amber-700">
            🛒 Your Purchased Cakes
          </h2>

          {purchasedCakes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {purchasedCakes.map((cake) => (
                <div
                  key={cake._id}
                  className="bg-white border flex flex-col justify-center items-center border-amber-200 rounded-xl p-6 sm:p-8 shadow hover:shadow-lg transition w-full"
                >
                  <img
                    src={cake.image}
                    alt={cake.cakeName}
                    className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover rounded mb-3"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 text-center">
                    {cake.cakeName}
                  </h3>
                  <p className="text-gray-600">₹{cake.amount}</p>
                  {/* <p className="text-gray-600 text-sm">Payment ID: {cake.paymentId}</p> */}
                  <p className="text-sm text-gray-500">
                    Date: {new Date(cake.createdAt).toLocaleString()}
                  </p>

                  {/* Order Timeline */}
                  <div className="w-full mt-4">
                    <OrderTimeline status={cake.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">
              You haven’t purchased any cakes yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
