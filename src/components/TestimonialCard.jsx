// src/components/TestimonialCard.jsx
import React from 'react';

const TestimonialCard = ({ name, feedback, avatar }) => {
  return (
    <div className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition duration-300 bg-white">
      <div className="flex items-center mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      </div>
      <p className="text-gray-700 italic">"{feedback}"</p>
    </div>
  );
};

export default TestimonialCard;
