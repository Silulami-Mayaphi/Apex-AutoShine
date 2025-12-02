// src/components/Gallery.jsx
import React from 'react';
import GalleryCard from './GalleryCard';
import before1 from '../assets/before1.jpg';
import after1 from '../assets/after1.jpg';
import before2 from '../assets/before2.jpg';
import after2 from '../assets/after2.jpg';

const galleryItems = [
  { image: before1, title: "Before – Exterior Wash" },
  { image: after1, title: "After – Exterior Wash" },
  { image: before2, title: "Before – Interior Detailing" },
  { image: after2, title: "After – Interior Detailing" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Our <span className="text-blue-700">Work</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryItems.map((item, index) => (
            <GalleryCard 
              key={index} 
              image={item.image} 
              title={item.title} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
