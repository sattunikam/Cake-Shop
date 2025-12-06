import React from "react";
import { FaBox, FaTruck, FaCheckCircle, FaShippingFast } from "react-icons/fa";
import { motion } from "framer-motion";

const OrderTimeline = ({ status }) => {
  const steps = [
    { label: "Ordered", icon: <FaBox />, subText: "Your order has been placed" },
    { label: "Shipped", icon: <FaShippingFast />, subText: "Your package has left the seller facility" },
    { label: "Out for delivery", icon: <FaTruck />, subText: "Your package is arriving today" },
    { label: "Delivered", icon: <FaCheckCircle />, subText: "Package delivered successfully" },
  ];

  const activeIndex = steps.findIndex((s) => s.label === status);

  // Line stops at last step
  const progressPercent =
    activeIndex === steps.length - 1
      ? 100
      : (activeIndex / (steps.length - 1)) * 100;

  return (
    <div className="w-full px-4 py-8 overflow-x-auto">
      <div className="relative flex items-center min-w-[600px]">

        {/* Base line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-300 rounded-full z-0" />

        {/* Active progress line with rounded ends */}
        <motion.div
          className="absolute top-6 left-0 h-1 rounded-full z-0"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundColor: "#ca6c0a", borderRadius: "9999px" }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isActive = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <div
              key={index}
              className="flex flex-col items-center relative z-10 px-4 cursor-pointer"
            >
              {/* Icon with hover effect */}
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md
                  ${isActive ? "bg-[#ca6c0a]" : "bg-gray-400"}
                `}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: isActive ? 1.05 : 0.9, opacity: 1 }}
                whileHover={{ scale: 1.15, boxShadow: "0 4px 15px rgba(202,108,10,0.5)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {step.icon}
              </motion.div>

              {/* Label */}
              <motion.p
                className={`mt-2 text-center text-sm font-medium
                  ${isActive ? "text-[#ca6c0a]" : "text-gray-500"}
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 * index }}
              >
                {step.label}
              </motion.p>

              {/* Subtext only for current step */}
              {isCurrent && (
                <motion.p
                  className="mt-1 text-xs text-gray-600 text-center max-w-[160px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {step.subText}
                </motion.p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
