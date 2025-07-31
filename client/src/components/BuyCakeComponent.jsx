import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const BuyNow = ({ price, cakeName, image }) => {
   const [user, setUser] = useState(null);

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null); // logged out
      }
    };

    fetchUser();
  }, []);

  const loadRazorpay = async () => {
    try {
      // Step 1: Create order
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/create-order`,
        { amount: price },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_TESTKEY_ID, // Razorpay test key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Cake Shop",
        description: "Delicious Cake Purchase",
        order_id: data.order.id,
        handler: async function (response) {
          toast.success("Payment Success!");
          console.log("Payment response:", response);

          // Step 2: Send payment details to backend for verification and save
          try {
            await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/api/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cakeName,
                image,
                amount: price,
              },
              { withCredentials: true }
            );

            toast.success("Cake purchase saved to DB!");
          } catch (error) {
            console.error("Payment verification failed", error);
            toast.error("Server verification failed.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Failed", error);

      if (error.response && error.response.status === 401) {
        toast.error("Please login to buy this cake.");
      } else {
        toast.error("Payment initiation failed");
      }
    }
  };

  return (
    <button
      onClick={loadRazorpay}
      className="mt-3 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
    >
      Buy Now
    </button>
  );
};

export default BuyNow;
