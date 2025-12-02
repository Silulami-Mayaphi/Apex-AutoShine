import React from "react";

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-8 text-center">
      <p className="text-gray-300 mb-2">
        &copy; {new Date().getFullYear()} Apex AutoShine. All rights reserved.
      </p>
      <p className="text-gray-400 text-sm">
        Designed with care and precision.
      </p>
    </footer>
  );
};

export default Footer;
