import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setform] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        form,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Login successful!");

        setTimeout(() => {
          const role = response.data.role; // read role from response

          if (role === "admin") {
            navigate("/admin"); // redirect to admin
          } else {
            navigate("/dashboard"); // redirect to user
          }
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-pink-600 mb-6 text-center font-outfit">
          Cake Bliss
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={form.email}
          onChange={handleChange}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded"
          value={form.password}
          name="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600"
        >
          Log in
        </button>

        <p className="text-center p-3 text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-700" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
