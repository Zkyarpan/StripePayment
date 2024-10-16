"use client";

import React, { useState } from "react";
import { useCartStore } from "@/app/store/useCartStore";
import axios from "axios";

// Helper function to format prices
const formatPrice = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const CartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true); // Set loading state
    setError(""); // Reset any previous errors

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }
      );

      // Redirect to Stripe checkout page
      window.location.href = response.data.url;
    } catch (error) {
      setError(
        "There was an error processing your checkout. Please try again."
      );
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-80 flex justify-center items-center z-10">
      <div className="bg-white p-8 rounded-2xl w-96 shadow-2xl transform transition-transform duration-300 scale-100 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">
            Your cart is currently empty.
          </p>
        ) : (
          <>
            <ul className="divide-y divide-gray-300">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-4 hover:bg-gray-50 transition-all"
                >
                  <div>
                    <span className="font-semibold text-lg text-gray-700">
                      {item.name}
                    </span>
                    <br />
                    <span className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-700">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition-all duration-300"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-4 py-2 w-full rounded-full shadow-lg transition-all duration-300 transform ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105 hover:bg-blue-700"
                }`}
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
            </div>
          </>
        )}

        <button
          className="bg-gray-600 text-white font-medium px-4 py-2 w-full mt-4 rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
