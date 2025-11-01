import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle navigation and close mobile menu
  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Function to handle smooth scrolling for in-page navigation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // Close mobile menu after scrolling
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#eeeee4]/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-9xl mx-auto px-4 sm:px-1 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/QUIND J-cropped.svg" 
              alt="Quinde Cennial Logo" 
              className="h-12 w-auto transition-all duration-300"
              onClick={() => navigate('/')} // Navigate to home
              style={{ cursor: 'pointer' }}
            />
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', action: () => scrollToSection('about') },
                { name: 'Events', path: '/events' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <a
                  key={item.name}
                  onClick={item.action ? item.action : () => handleNavigation(item.path)}
                  className="text-[#572a01] hover:text-[#844C37] font-medium transition-colors duration-200 cursor-pointer relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#572a01] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-[#572a01] hover:text-[#844C37] focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // Toggle mobile menu
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu (Hidden by default) */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-[#eeeee4]/95 backdrop-blur-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', action: () => scrollToSection('about') },
            { name: 'Events', path: '/events' },
            { name: 'Gallery', path: '/gallery' },
            { name: 'Contact', path: '/contact' }
          ].map((item) => (
            <a
              key={item.name}
              onClick={item.action ? item.action : () => handleNavigation(item.path)}
              className="text-[#572a01] hover:bg-[#d4c9b8] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;