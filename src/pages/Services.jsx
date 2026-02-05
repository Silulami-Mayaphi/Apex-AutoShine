// src/pages/Services.jsx
import React from 'react';
import ServiceCard from '../components/ServiceCard';

const services = [
  {
    title: "Exterior Wash",
    description: "Thorough cleaning of your car's exterior to make it gleam.",
    icon: "🚗",
  },
  {
    title: "Interior Detailing",
    description: "Deep cleaning of your car's interior including carpets and seats.",
    icon: "🧽",
  },
  {
    title: "Full Detailing",
    description: "Complete exterior and interior care for a like-new look.",
    icon: "✨",
  },
  {
    title: "Wax & Polish",
    description: "Protect your car’s paint and give it a glossy finish.",
    icon: "💎",
  },
  { 
  title: "Other Mobile Detailing", 
  description: "Mobile cleaning services for sliding doors, mats, and other surfaces at your home or office. Prices vary based on service requirements." 
}

];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Our <span className="text-blue-700">Services</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
