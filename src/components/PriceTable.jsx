// src/components/PriceSection.jsx
import React from 'react';
import PriceTable from './PriceTable';

const PriceSection = () => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Our <span className="text-blue-700">Pricing</span>
        </h2>
        <PriceTable />
      </div>
    </section>
  );
};

export default PriceSection;
