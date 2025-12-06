import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("userAddress", data.userAddress);
      formData.append("userPhone", data.userPhone);
      formData.append("userPhoto", data.userPhoto[0]); // file

      const response = await axios.post(
        "http://localhost:3000/api/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error("Registration failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col gap-4 shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl text-pink-600 font-semibold mb-6 text-center">
          Cake Bliss
        </h2>

        {/* NAME */}
        <div className="flex flex-col gap-0">
          <input
            type="text"
            placeholder="Name"
            className={`w-full p-3 border rounded ${
              errors.name ? "border-red-700" : "border-gray-300"
            }`}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
              maxLength: { value: 15, message: "Maximum 15 characters only" },
            })}
          />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-0">
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 border rounded ${
              errors.email ? "border-red-700" : "border-gray-300"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-0">
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 border rounded ${
              errors.password ? "border-red-700" : "border-gray-300"
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div className="flex flex-col gap-0">
          <input
            type="text"
            placeholder="Address"
            className={`w-full p-3 border rounded ${
              errors.userAddress ? "border-red-700" : "border-gray-300"
            }`}
            {...register("userAddress", {
              required: "Address is required",
            })}
          />
          {errors.userAddress && (
            <p className="text-red-700">{errors.userAddress.message}</p>
          )}
        </div>

        {/* PHONE */}
        <div className="flex flex-col gap-0">
          <input
            type="number"
            placeholder="WhatsApp Phone Number"
            className={`w-full p-3 border rounded ${
              errors.userPhone ? "border-red-700" : "border-gray-300"
            }`}
            {...register("userPhone", {
              required: "Phone number is required",
              minLength: { value: 10, message: "Must be 10 digits" },
              maxLength: { value: 10, message: "Must be 10 digits" },
            })}
          />
          {errors.userPhone && (
            <p className="text-red-700">{errors.userPhone.message}</p>
          )}
        </div>

        {/* FILE */}
        <div className="flex flex-col gap-0">
          <label className="mb-1 font-semibold">Profile Photo (max 200KB)</label>
          <input
            type="file"
            className={`w-full p-3 border rounded ${
              errors.userPhoto ? "border-red-700" : "border-gray-300"
            }`}
            {...register("userPhoto", {
              required: "Profile photo is required",
              validate: {
                fileSize: (value) =>
                  value[0]?.size <= 200 * 1024 ||
                  "File size must be less than 200KB",
                fileType: (value) =>
                  ["image/jpeg", "image/png", "image/jpg"].includes(
                    value[0]?.type
                  ) || "Only JPG or PNG allowed",
              },
            })}
          />
          {errors.userPhoto && (
            <p className="text-red-700">{errors.userPhoto.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded"
        >
          Create Account
        </button>

        <p className="text-center p-3 text-sm">
          Have an account? <Link className="text-blue-700" to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
