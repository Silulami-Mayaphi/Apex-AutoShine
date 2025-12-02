import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";

const Home = () => {
  return (
    <>
    <div>
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
      <div id="booking">
  <BookingForm />
</div>
    </>
  );
};

export default Home;



