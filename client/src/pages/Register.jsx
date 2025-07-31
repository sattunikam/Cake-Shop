import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Submitted:", formData);

    try {
      if (formData) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/register`,
          formData
        );
        console.log(response.data);

        if (response.status === 201) {
          toast.success("Registration successful!");
          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please check your input.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl text-pink-600 font-semibold mb-6 text-center font-outfit">
          Cake Bliss
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded"
          value={formData.password || ""}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded"
        >
          Create Account
        </button>

        <p className="text-center p-3 text-sm">
          Have an account?{" "}
          <Link className="text-blue-700" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
