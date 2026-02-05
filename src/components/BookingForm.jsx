import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    area: "",
    address: "",
    services: [],
    vehicleType: "hatchback",
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const areas = [
    "Vincent",
    "Beacon Bay",
    "Southernwood",
    "Cove Rock",
    "Gonubie",
    "Mdantsane",
    "Cambridge",
    "Quigney",
    "Greenfields",
    "Dawn",
  ];

  // Main services depend on vehicle type, extras have fixed per-item prices
  const servicePricing = {
    "Exterior Wash": { hatchback: 120, sedan: 150, suv: 200, truck: 250 },
    "Interior Detailing": { hatchback: 150, sedan: 200, suv: 250, truck: 300 },
    "Wax & Polish": { hatchback: 250, sedan: 300, suv: 350, truck: 400 },
    "Mat Cleaning": 100,              // per mat
    "Sliding Door Cleaning": 150,     // per door
    "Window Cleaning": 50,            // per window
    "Mattress Cleaning": 350,         // per mattress
  };

  const allServices = Object.keys(servicePricing);

  const calculateTotal = (servicesArray, vehicle) => {
    let total = 0;
    servicesArray.forEach((s) => {
      const price = servicePricing[s];
      if (typeof price === "number") total += price; // fixed per-item
      else total += price[vehicle] || 0;             // vehicle-based
    });
    return total;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (service) => {
    let updatedServices = [...formData.services];
    if (updatedServices.includes(service)) {
      updatedServices = updatedServices.filter((s) => s !== service);
    } else {
      updatedServices.push(service);
    }

    setFormData({ ...formData, services: updatedServices });
    setTotalAmount(calculateTotal(updatedServices, formData.vehicleType));
  };

  const handleVehicleChange = (e) => {
    const newVehicle = e.target.value;
    setFormData({ ...formData, vehicleType: newVehicle });
    setTotalAmount(calculateTotal(formData.services, newVehicle));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.services.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: totalAmount,
          services: formData.services,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to Yoco payment page
        window.location.href = data.paymentUrl;
      } else {
        alert(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
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
          required
          className="w-full border p-3 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <select
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        >
          <option value="">Select Area</option>
          {areas.map((area, i) => (
            <option key={i} value={area}>
              {area}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <h3 className="text-lg font-bold">Select Services</h3>
        <div className="grid grid-cols-2 gap-2">
          {allServices.map((s) => (
            <label key={s} className="block border p-2 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={formData.services.includes(s)}
                onChange={() => handleServiceToggle(s)}
              />
              {" " + s}
            </label>
          ))}
        </div>

        <h3 className="text-lg font-bold">Select Vehicle</h3>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleVehicleChange}
          className="w-full border p-3 rounded"
        >
          <option value="hatchback">Hatchback</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="truck">Truck</option>
        </select>

        <p className="text-xl font-bold">Total Price: R {totalAmount}</p>

        <button
          type="submit"
          className="w-full bg-navy text-white p-3 rounded"
        >
          Book Now & Pay
        </button>
      </form>
    </section>
  );
};

export default BookingForm;
