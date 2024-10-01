import React from "react";

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <button className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Success;
