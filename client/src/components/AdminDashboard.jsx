import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, {
        withCredentials: true,
      });
      setUsers(response.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/user/${id}`, {
        withCredentials: true,
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-5xl w-full container pt-18">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="space-y-4">
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
                      {user.purchasedCakes.map((cake, index) => (
                        <li key={index} className="flex gap-3 items-center">
                          <img
                            src={cake.image}
                            alt={cake.cakeName}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{cake.cakeName} - ₹{cake.amount}</p>
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
