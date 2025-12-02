// src/components/Testimonials.jsx
import React from 'react';
import TestimonialCard from './TestimonialCard';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';

const testimonials = [
  {
    name: "John Doe",
    feedback: "Apex AutoShine made my car look brand new! Highly recommend their services.",
    avatar: avatar1,
  },
  {
    name: "Sarah Smith",
    feedback: "Quick, professional, and reliable. My go-to car detailing place!",
    avatar: avatar2,
  },
  {
    name: "Michael Lee",
    feedback: "Excellent service and attention to detail. My car has never looked better.",
    avatar: avatar3,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          What Our <span className="text-blue-700">Clients Say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              name={testimonial.name}
              feedback={testimonial.feedback}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
