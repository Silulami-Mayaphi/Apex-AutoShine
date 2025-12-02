import React from "react";
import PriceTable from "./PriceTable";

const PriceSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">Pricing</h2>
        <p className="text-gray-600 mt-2">
          Affordable packages to get your car shining like new.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <PriceTable />
      </div>
    </section>
  );
};

export default PriceSection;
