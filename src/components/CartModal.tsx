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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-4"
                >
                  <div>
                    <span className="font-semibold">{item.name}</span>
                    <br />
                    <span className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span>{formatPrice(item.price * item.quantity)}</span>
                    <button
                      className="bg-red-500 text-white px-3 py-1 ml-4 rounded-lg"
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
                className={`bg-blue-500 text-white px-4 py-2 w-full rounded-lg transition-all duration-300 ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
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
          className="bg-gray-500 text-white px-4 py-2 w-full mt-4 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
