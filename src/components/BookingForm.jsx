import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
  });

  const [message, setMessage] = useState("");

  const services = ["Exterior Wash", "Interior Detailing", "Wax & Polish"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Thank you, ${data.booking.name}! Your booking is confirmed.`);
        setFormData({ name: "", email: "", phone: "", service: "", date: "" });
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
      console.error(error);
    }
  };

  return (
    <section className="py-24 bg-gray-50 text-navy text-center" id="booking">
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Book Your Service</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow"
          required
        />
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow"
          required
        >
          <option value="">Select Service</option>
          {services.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow"
          required
        />
        <button
          type="submit"
          className="w-full bg-navy text-white px-6 py-3 rounded-lg hover:bg-yellow hover:text-navy transition transform hover:scale-105"
        >
          Book Now
        </button>
        {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      </form>
    </section>
  );
};

export default BookingForm;
