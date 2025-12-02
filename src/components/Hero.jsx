import React from "react";
import heroCar from "../assets/hero-car.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gray-100 h-screen flex items-center">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy animate-fade-in">
            Shine Your Car, Drive Happy
          </h1>
          <p className="text-gray-700 text-lg md:text-xl animate-fade-in delay-200">
            Professional car detailing services that make your vehicle look brand new.
          </p>
          <button
  onClick={() =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }
  className="bg-navy text-white px-6 py-3 rounded-lg hover:bg-yellow hover:text-navy transition transform hover:scale-105 animate-fade-in delay-400"
>
  Book Now
</button>

        </div>
        <div className="md:w-1/2">
          <img
            src={heroCar}
            alt="Car"
            className="w-full h-auto rounded-xl shadow-xl animate-fade-in delay-600"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
