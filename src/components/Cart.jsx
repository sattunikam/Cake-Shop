import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import BuyNow from "../components/BuyCakeComponent";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen  py-28 flex flex-col items-center">
      {/*  Header */}
      <div className="w-full  max-w-4xl flex px-2 justify-between items-center py-4 md:py-4">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          🛍️ Your Cart
        </h1>
        <div className="flex items-center gap-3">
          {/* <CustomizedBadges /> */}
          {cartItems.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="px-4 py-2 cursor-pointer text-sm font-medium bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:opacity-90 shadow-md transition"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/*  Cart Box */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8 transition-all">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            Your cart is empty 🛒
          </p>
        ) : (
          <>
            {/*  Cart Items */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-100 rounded-xl p-5 hover:shadow-lg hover:scale-[1.01] transition-transform bg-white"
                >
                  {/*  Product Image + Info */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-sm ring-1 ring-amber-100"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-xl">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        ₹{item.price} × {item.quantity} ={" "}
                        <span className="font-semibold text-gray-900">
                          ₹{item.price * item.quantity}
                        </span>
                      </p>

                      {/*  Quantity Buttons */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => dispatch(decrementQty(item.id))}
                          className="w-8 h-8 flex justify-center items-center rounded-full border text-gray-700 hover:bg-amber-100 active:scale-90 transition"
                        >
                          −
                        </button>
                        <span className="text-gray-800 font-semibold text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(incrementQty(item.id))}
                          className="w-8 h-8 flex justify-center items-center rounded-full border text-gray-700 hover:bg-amber-100 active:scale-90 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/*  Buy & Remove Buttons */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-0 md:gap-3">
                    <BuyNow
                     id={item.id}
                      price={item.price}
                      cakeName={item.name}
                      image={item.image}
                      quantity={item.quantity} 
                    />
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="px-4 py-3 mt-2 cursor-pointer bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-lg hover:opacity-90 transition text-sm shadow-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/*  Total Price */}
            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6">
              <p className="text-xl font-semibold text-gray-800">
                Total Amount:
              </p>
              <p className="text-2xl font-extrabold text-amber-600">
                ₹{totalPrice}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
