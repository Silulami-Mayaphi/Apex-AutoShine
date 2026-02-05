// src/pages/Payment.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
const navigate = useNavigate();

const {
  name,
  email,
  services = [],
  vehicleType,
  amount,
} = location.state || {};

const serviceText = services.join(", ");


useEffect(() => {
  if (!name || !amount || !services?.length) {
    navigate("/");
    return;
  }

  setOrderNumber("AA-" + Math.floor(Math.random() * 1000000));
}, [name, amount, services, navigate]);


  const handlePay = () => {
    const yoco = new window.Yoco({
      publicKey: "pk_live_58e6ef6149wobLX61d94",
    });

    const serviceText =
      services.length > 1
        ? `${services.length} selected services`
        : services[0];

    yoco.checkout({
      amountInCents: amount * 100,
      currency: "ZAR",
      name: "Apex AutoShine Booking",
      description: `Order ${orderNumber} — ${serviceText} (${vehicleType})`,
      callback: (result) => {
        if (result.error) {
          alert("Payment failed: " + result.error.message);
        } else {
          navigate("/booking-success", {
            state: {
              services,
              vehicleType,
              name,
              email,
              amount,
              orderNumber,
              paymentId: result.id,
            },
          });
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">
        Complete Your Payment
      </h1>

      <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full text-center">
        <p className="text-gray-300 mb-2">
          <strong>Order Number:</strong> {orderNumber}
        </p>

        <p className="text-gray-300 mb-2">
          <strong>Services:</strong> {services.join(", ")}
        </p>

        <p className="text-gray-300 mb-2">
          <strong>Vehicle:</strong> {vehicleType}
        </p>

        <p className="text-gray-300 mb-2">
          <strong>Name:</strong> {name}
        </p>

        <p className="text-cyan-400 font-bold mb-6">
          <strong>Amount:</strong> R{amount}
        </p>

        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg"
          onClick={handlePay}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
