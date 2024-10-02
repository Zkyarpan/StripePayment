import React from "react";
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

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:5300/checkout", {
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      window.location.href = response.data.url; // Redirects to Stripe checkout page
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-out z-10"
      style={{ animation: "fadeIn 0.5s" }} // Animation for fade in
    >
      <div
        className="bg-white p-8 rounded-lg w-96 shadow-lg transform transition-transform duration-300 ease-out scale-95 hover:scale-100"
        style={{ animation: "slideUp 0.5s" }} // Animation for slide up
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600 mb-4">Your cart is currently empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-4"
              >
                <div className="text-gray-800">
                  <span className="font-semibold">{item.name}</span> <br />
                  <span className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-800">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    className="bg-red-500 text-white px-3 py-1 ml-4 rounded-lg hover:bg-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition-all duration-300"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>

        <button
          className="bg-gray-500 text-white px-4 py-2 w-full mt-4 rounded-lg hover:bg-gray-600 transition-all duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
