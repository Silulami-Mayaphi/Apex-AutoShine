import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId"); // optional reference

  useEffect(() => {
    if (bookingId) {
      // Update booking status to "failed" in backend
      axios
        .post("http://localhost:5000/api/yoco/update-status", {
          bookingId,
          status: "failed",
        })
        .then(() => {
          console.log("Booking updated to failed.");
        })
        .catch((err) => {
          console.error("Failed to update booking status:", err.response?.data || err.message);
        });
    }
  }, [bookingId]);

  return (
    <section className="py-24 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p className="text-lg">Your payment was unsuccessful or cancelled. Please try again.</p>
    </section>
  );
};

export default PaymentFailure;
