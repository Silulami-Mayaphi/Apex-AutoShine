import React from "react";
import useInView from "../hooks/useInView";

const services = [
  { title: "Exterior Wash", description: "Clean and polish your car's exterior." },
  { title: "Interior Detailing", description: "Deep clean carpets, seats, and dashboards." },
  { title: "Wax & Polish", description: "Protect your car with long-lasting shine." },
];

// Single card component
const ServiceCard = ({ title, description }) => {
  const [ref, isInView] = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`bg-gray-50 p-8 rounded-2xl shadow-lg transform transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } hover:shadow-2xl hover:-translate-y-2`}
    >
      <h3 className="text-2xl font-semibold mb-4 text-navy">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-16">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
