import React from "react";

const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Oops! It seems like your payment has been cancelled. If you want to
          retry, please go back to the payment page.
        </p>
        <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Go Back to Payment
        </button>
      </div>
    </div>
  );
};

export default Cancel;
