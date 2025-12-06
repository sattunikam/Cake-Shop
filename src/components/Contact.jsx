import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiMessageCircle } from "react-icons/fi";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("access_key", "dbb6e43f-40b5-4a48-a6b2-0e2053ef7f5f");
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("message", data.message);

    try {
      const response = await axios.post(
        "https://api.web3forms.com/submit",
        formData
      );
      const result = response.data;

      if (result.success) {
        toast.success("Message sent successfully!");
        reset();
      } else {
        toast.error(result.message || "Submission failed!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

    const isHomePage = ["/"].includes(location.pathname);

  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center">
      <div className={`container mx-auto px-5 md:px-0 w-full ${isHomePage ? "py-10" : "py-30"}`}>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Contact Us
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white mx-auto w-full md:w-[480px] shadow-xl rounded-2xl p-8 space-y-5 border border-amber-100"
        >
          {/* USERNAME FIELD */}
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700" />
            <input
              type="text"
              placeholder="Your name"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-300 transition ${
                errors.username ? "border-red-500" : "border-amber-200"
              }`}
              {...register("username", {
                required: "Username is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 20, message: "Maximum 20 characters" },
              })}
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* EMAIL FIELD */}
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700" />
            <input
              type="email"
              placeholder="Email address"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-300 transition ${
                errors.email ? "border-red-500" : "border-amber-200"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* MESSAGE FIELD */}
          <div className="relative">
            <FiMessageCircle className="absolute left-4 top-3 text-amber-700" />
            <textarea
              placeholder="Your message"
              rows={5}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300 transition ${
                errors.message ? "border-red-500" : "border-amber-200"
              }`}
              {...register("message", {
                required: "Message is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
              })}
            ></textarea>
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-md transition disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            <button
              type="reset"
              onClick={() => toast.info("Form cleared")}
              className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl shadow-md transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
