import React, { useState } from "react";
import useInView from "../hooks/useInView";

// Services list with price + detailed description
const services = [
  {
    id: 1,
    title: "Exterior Wash",
    short: "Clean and polish your car's exterior.",
    details:
      "Thorough hand wash, exterior polish, and tire cleaning to restore your car’s shine.",
    pricing: {
      hatchback: 120,
      sedan: 150,
      suv: 200,
      truck: 250,
    },
    video: "video-placeholder.mp4", // Replace later with actual video
  },
  {
    id: 2,
    title: "Interior Detailing",
    short: "Deep clean carpets, seats, and dashboards.",
    details:
      "Vacuuming, shampooing, and sanitizing all interior surfaces for a spotless cabin.",
    pricing: {
      hatchback: 150,
      sedan: 200,
      suv: 250,
      truck: 300,
    },
    video: "video-placeholder.mp4",
  },
  {
    id: 3,
    title: "Wax & Polish",
    short: "Protect your car with long-lasting shine.",
    details:
      "Premium hand polish, paint protection wax, and exterior shine that lasts for weeks.",
    pricing: {
      hatchback: 250,
      sedan: 300,
      suv: 350,
      truck: 400,
    },
    video: "video-placeholder.mp4",
  },
  {
    id: 4,
    title: "Other Mobile Detailing",
    short: "Cleaning for sliding doors, mats, and other surfaces at home or office.",
    details:
      "Mobile cleaning for sliding doors, mats, and other surfaces, done conveniently at your home or office. Perfect for spaces that need extra care beyond the car.",
    pricing: {
      mat: 100,
      slidingDoor : 150,
      windows: 200,
      mattress: 250,
    },
    video: "video-placeholder.mp4",
  },
];


// Card
const ServiceCard = ({ service, onSelect }) => {
  const [ref, isInView] = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`bg-gray-50 p-8 rounded-2xl shadow-lg transform transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } hover:shadow-2xl hover:-translate-y-2`}
    >
      <h3 className="text-2xl font-semibold mb-4 text-navy">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.short}</p>

      <button
        onClick={() => onSelect(service)}
        className="mt-4 px-6 py-3 bg-navy text-white rounded-xl hover:bg-blue-900 transition"
      >
        View Details
      </button>
    </div>
  );
};

// Modal component
const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl relative">
        <button
          className="absolute top-3 right-3 text-gray-700 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-navy mb-4">{service.title}</h2>

        {/* VIDEO OR PLACEHOLDER */}
        <div className="w-full h-48 rounded-xl mb-6 overflow-hidden relative flex items-center justify-center bg-gray-200">
          {service.video ? (
            <video
              src={service.video}
              controls
              className="w-full h-full object-cover rounded-xl"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 opacity-80 flex items-center justify-center">
              <span className="text-gray-500 text-lg font-medium z-10">
                Video Placeholder
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-700 mb-6">{service.details}</p>

        {/* PRICING BY VEHICLE TYPE */}
        <div className="mb-6">
          <h3 className="font-semibold text-navy text-lg mb-2">
            Pricing by Vehicle Type:
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {service.pricing &&
              Object.entries(service.pricing).map(([vehicle, price]) => (
                <li key={vehicle}>
                  {vehicle
                    .replace(/([A-Z])/g, " $1") // add space before capitals
                    .replace(/^./, str => str.toUpperCase())}: R{price}
                </li>
              ))}
          </ul>
        </div>

        <a
          href={`/book?service=${service.title}`}
          className="block w-full px-6 py-3 text-center bg-navy text-white rounded-xl hover:bg-blue-900 transition"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};


const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <section className="py-24 bg-white" id="services">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-16">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={setSelectedService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
};

export default ServicesSection;
