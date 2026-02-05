import React, { useState } from "react";

const ServiceModal = ({ service, onClose }) => {
  const [vehicleType, setVehicleType] = useState(
    Object.keys(service.pricing || {})[0] || "hatchback"
  );

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

        {/* Video or placeholder */}
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

        {/* Vehicle type selector */}
        {service.pricing && (
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Vehicle Type:
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full p-3 border rounded"
            >
              {Object.keys(service.pricing).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <p className="mt-2 text-gray-700">
              Price: R {service.pricing[vehicleType]}
            </p>
          </div>
        )}

        {/* Book Now button with vehicle type in URL */}
        <a
          href={`/book?service=${encodeURIComponent(
            service.title
          )}&vehicle=${vehicleType}`}
          className="block w-full px-6 py-3 text-center bg-navy text-white rounded-xl hover:bg-blue-900 transition"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default ServiceModal;
