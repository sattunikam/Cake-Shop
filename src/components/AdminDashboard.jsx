import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  // ⭐ NEW → No need for token, cookies will handle authentication

  // ⭐ Initialize Socket.io (send cookies)
  useEffect(() => {
    const s = io("http://localhost:3000", {
      withCredentials: true, // ⭐ NEW → Send JWT cookie automatically
      transports: ["websocket","polling"],
    });

    setSocket(s);

    // ⭐ NEW → Listen for real-time order status updates
    s.on("orderStatusUpdatedForAdmin", (data) => {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === data.orderId ? { ...o, status: data.status } : o
        )
      );
    });

    return () => s.disconnect();
  }, []); // ⭐ NO dependency

  // ⭐ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/users", {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
    }
  };

  // ⭐ Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/orders/all", {
        withCredentials: true,
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err.message);
    }
  };

  // ⭐ Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/user/${id}`, {
        withCredentials: true,
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err.message);
    }
  };

  // ⭐ Logout
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/logout", {
        withCredentials: true,
      });
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  // ⭐ Update order status + emit socket
  const updateStatus = async (orderId, newStatus, userId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/orders/update-status/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      // Local state update
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );

      // ⭐ Emit socket event → Backend will notify user + admin
      socket?.emit("orderStatusUpdatedByAdmin", {
        orderId,
        userId,
        status: newStatus,
      });
    } catch (err) {
      console.error("Status update failed:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  return (
    <div className="p-6 min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-5xl w-full container pt-18">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Orders Section */}
        <h2 className="text-xl font-semibold mt-8 mb-4">All Orders</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border bg-white shadow rounded-md flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <div>
                <p>
                  <strong>{order.cakeName}</strong> — ₹{order.amount}
                </p>
                <p className="text-sm text-gray-500">User: {order.userName}</p>
                <p className="text-sm">Status: {order.status}</p>
              </div>

              <div className="flex gap-2 items-center mt-2 sm:mt-0">
                <select
                  value={order.status}
                  onChange={(e) =>
                    setOrders((prev) =>
                      prev.map((o) =>
                        o._id === order._id
                          ? { ...o, status: e.target.value }
                          : o
                      )
                    )
                  }
                  className="border p-2 rounded"
                >
                  <option>Ordered</option>
                  <option>Shipped</option>
                  <option>Out for delivery</option>
                  <option>Delivered</option>
                </select>

                <button
                  onClick={() =>
                    updateStatus(order._id, order.status, order.user)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Users Section */}
        <div className="space-y-4 mt-8">
          {users.map((user) => (
            <div
              key={user._id}
              className="p-4 border rounded-md shadow bg-white flex flex-col sm:flex-row justify-between gap-4"
            >
              <div className="flex-1">
                <p>
                  <strong>{user.name}</strong> ({user.email})
                </p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>

                {user.role !== "admin" && user.purchasedCakes?.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold mb-1">Purchased Cakes:</p>
                    <ul className="list-inside text-sm text-gray-700 space-y-2">
                      {user.purchasedCakes.map((cake, idx) => (
                        <li key={idx} className="flex gap-3 items-center">
                          <img
                            src={cake.image}
                            alt={cake.cakeName}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">
                              {cake.cakeName} - ₹{cake.amount}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(cake.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {user.role !== "admin" && user.purchasedCakes?.length === 0 && (
                  <p className="text-sm text-gray-400 mt-2">No purchases</p>
                )}
              </div>

              {user.role !== "admin" && (
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded self-start sm:self-center"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
