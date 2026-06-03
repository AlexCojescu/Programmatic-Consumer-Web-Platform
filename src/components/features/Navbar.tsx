'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IMAGE_SIZES } from '@/lib/image-sizes';
// REMOVED: AnimatePresence, motion, and ChevronDown are no longer needed.

// REMOVED: The `services` data array is no longer necessary.

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // REMOVED: State for dropdowns is gone.

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    // REMOVED: Logic for closing mobile services dropdown.
  }

  return (
    <nav
      className={`w-full fixed top-0 bg-white z-50 transition-all duration-500 shadow-lg ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" onClick={closeMobileMenu}>
            <Image
              src="/Logo1.png"
              alt="Slute Logo"
              width={130}
              height={78}
              sizes={IMAGE_SIZES.navbarLogo}
              className="h-12 w-auto hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>
        </div>

        {/* --- DESKTOP NAVIGATION (MODIFIED) --- */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/about" className="text-gray-800 hover:text-purple-600 transition-colors duration-200 cursor-pointer relative group font-medium">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </a>

          
          
          {/* REPLACED: The entire dropdown div is now a single, simple Link. */}
          <Link 
            href="/services" 
            className="text-gray-800 hover:text-purple-600 transition-colors duration-200 cursor-pointer relative group font-medium"
          >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <a href="/pricing" className="text-gray-800 hover:text-purple-600 transition-colors duration-200 cursor-pointer relative group font-medium">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
         
          <Link
            href="/contact"
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-full hover:bg-blue-700 transition transform hover:scale-105 active:scale-95 duration-200 shadow-lg hover:shadow-blue-600/50"
          >
            Schedule a call
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-800 focus:outline-none" aria-label="Toggle menu">
            <div className="w-6 flex flex-col items-end space-y-1.5">
              <span className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
              <span className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-5'}`}></span>
              <span className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN (MODIFIED) --- */}
      <div className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] pt-4 pb-8' : 'max-h-0'}`}>
        <div className="flex flex-col items-center space-y-2 px-6">
          <a href="/about" onClick={closeMobileMenu} className="text-gray-800 text-lg w-full text-center py-3">About</a>
          
          {/* REPLACED: The entire accordion div is now a single, simple Link. */}
          <Link 
            href="/services" 
            onClick={closeMobileMenu} 
            className="text-gray-800 text-lg w-full text-center py-3 border-t border-b border-gray-200"
          >
            Services
          </Link>

          <a href="/pricing" onClick={closeMobileMenu} className="text-gray-800 text-lg w-full text-center py-3">Pricing</a>
          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="bg-blue-600 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-700 transition w-full max-w-xs mt-4 text-center"
          >
            Schedule a call
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;