// src/components/GalleryCard.jsx
import React from 'react';

const GalleryCard = ({ image, title }) => {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-64 object-cover"
      />
      {title && (
        <div className="p-4 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
    </div>
  );
};

export default GalleryCard;
