import React from "react";
import BookingForm from "./BookingForm";

const BookingSection = () => {
  return (
    <section id="booking" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">Book a Service</h2>
        <p className="text-gray-600 mt-2">
          Select a service, choose a date, and we’ll handle the rest.
        </p>
      </div>

      <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
        <BookingForm />
      </div>
    </section>
  );
};

export default BookingSection;
