// src/components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 border rounded-xl hover:shadow-xl transition duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
