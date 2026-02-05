import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const navigate = useNavigate();

  const servicesList = [
    {
      title: "Exterior Wash",
      pricing: { hatchback: 120, sedan: 150, suv: 200, truck: 250 },
    },
    {
      title: "Interior Detailing",
      pricing: { hatchback: 150, sedan: 200, suv: 250, truck: 300 },
    },
    {
      title: "Wax & Polish",
      pricing: { hatchback: 250, sedan: 300, suv: 350, truck: 400 },
    },
  ];

  const otherServices = [
    { title: "Car Mat Cleaning", price: 100 },
    { title: "Sliding Door Cleaning", price: 150 },
    { title: "Window Cleaning", price: 200 },
    { title: "Mattress Cleaning", price: 250 },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    area: "",
    address: "",
    vehicleType: "hatchback",
    selectedServices: [],
    selectedOtherServices: [],
    totalAmount: 0,
  });

  // Calculate total price whenever selections change
  useEffect(() => {
    let total = 0;

    // Add main services cost
    formData.selectedServices.forEach((srvTitle) => {
      const srv = servicesList.find((s) => s.title === srvTitle);
      if (srv) {
        total += srv.pricing[formData.vehicleType] || 0;
      }
    });

    // Add "Other Mobile Detailing" costs
    formData.selectedOtherServices.forEach((srvTitle) => {
      const srv = otherServices.find((s) => s.title === srvTitle);
      if (srv) total += srv.price;
    });

    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [
    formData.selectedServices,
    formData.selectedOtherServices,
    formData.vehicleType,
  ]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleService = (title) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(title);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== title)
          : [...prev.selectedServices, title],
      };
    });
  };

  const toggleOtherService = (title) => {
    setFormData((prev) => {
      const exists = prev.selectedOtherServices.includes(title);
      return {
        ...prev,
        selectedOtherServices: exists
          ? prev.selectedOtherServices.filter((s) => s !== title)
          : [...prev.selectedOtherServices, title],
      };
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (
      formData.selectedServices.length === 0 &&
      formData.selectedOtherServices.length === 0
    ) {
      alert("Please select at least one service.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          services: [
            ...formData.selectedServices,
            ...formData.selectedOtherServices,
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Booking failed on server.");
        return;
      }

      // If backend succeeds, go to payment page
      navigate("/payment", { state: formData });

    } catch (err) {
      console.error("Booking error:", err);
      alert("Server not reachable. Check your backend.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Book Your Services</h1>

      <form onSubmit={handleBooking} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="hatchback">Hatchback</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="truck">Truck</option>
        </select>

        <div className="mt-4">
          <p className="font-semibold">Select Main Services:</p>
          {servicesList.map((s) => (
            <div key={s.title} className="flex gap-2">
              <input
                type="checkbox"
                checked={formData.selectedServices.includes(s.title)}
                onChange={() => toggleService(s.title)}
              />
              <label>
                {s.title} — R
                {s.pricing[formData.vehicleType]}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="font-semibold">Other Mobile Detailing:</p>
          {otherServices.map((s) => (
            <div key={s.title} className="flex gap-2">
              <input
                type="checkbox"
                checked={formData.selectedOtherServices.includes(
                  s.title
                )}
                onChange={() => toggleOtherService(s.title)}
              />
              <label>
                {s.title} — R{s.price}
              </label>
            </div>
          ))}
        </div>

        <p className="text-xl font-bold">
          Total: R {formData.totalAmount}
        </p>

        <button
          type="submit"
          className="w-full p-3 bg-blue-700 text-white rounded"
        >
          Confirm Booking & Pay
        </button>
      </form>
    </div>
  );
};

export default Book;
