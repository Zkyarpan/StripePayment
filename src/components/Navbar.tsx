"use client";

import React, { useState } from "react";
import CartModal from "./CartModal";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-lg">Stripe</div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={toggleModal}
          >
            Cart
          </button>
        </div>
      </nav>

      <CartModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default Navbar;
