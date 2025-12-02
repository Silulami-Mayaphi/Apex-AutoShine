import React from "react";

const Navbar = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-navy text-white px-6 py-4 flex justify-between items-center shadow-md fixed w-full z-50">
      <div className="text-2xl md:text-3xl font-bold tracking-wide">Apex AutoShine</div>
      <ul className="hidden md:flex space-x-8 text-lg font-medium">
        {[
          { name: "Home", id: "home" },
          { name: "Services", id: "services" },
          { name: "About", id: "about" },
          { name: "Contact", id: "contact" },
        ].map((link) => (
          <li
            key={link.id}
            className="hover:text-yellow transition-colors cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow after:transition-all hover:after:w-full"
            onClick={() => scrollToSection(link.id)}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
