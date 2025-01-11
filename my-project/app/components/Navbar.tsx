"use client";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white text-black shadow-md">
      <div className="text-2xl font-bold">
        <a href="/" className="text-blue-400">
          Koin
        </a>
        <span className="text-orange-400">X</span>
        <sup>TM</sup>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="block md:hidden" onClick={toggleMenu}>
        <button className="text-2xl">&#9776;</button>
      </div>

      <div
        className={`flex flex-col md:flex-row md:space-x-8 items-center font-bold space-y-4 md:space-y-0 ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <a href="#home" className="hover:text-gray-900">
          Crypto Taxes
        </a>
        <a href="#about" className="hover:text-gray-900">
          Free Tools
        </a>
        <a href="#services" className="hover:text-gray-900">
          Resource Center
        </a>
        <a
          href="#contact"
          className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
