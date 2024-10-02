"use client";

import React from "react";
import { useCartStore } from "./store/useCartStore";
// import axios from "axios";

const formatPrice = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const HomePage: React.FC = () => {
  const products = [
    {
      id: "price_1Q57v2ING6PDgphPtyyoWLZb",
      name: "Product 1",
      price: 4.99,
      description: "High-quality product.",
    },
    {
      id: "price_1Q57xUING6PDgphPbm6duDjh",
      name: "Product 2",
      price: 5.0,
      description: "Limited edition item.",
    },
    {
      id: "prod_Qx23N1EDqJpiAa",
      name: "Product 3",
      price: 5.0,
      description: "Best seller of the month.",
    },
  ];

  // const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-gray-800 mb-4">
              {formatPrice(product.price)}
            </p>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center mt-8">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div> */}
    </div>
  );
};

export default HomePage;
