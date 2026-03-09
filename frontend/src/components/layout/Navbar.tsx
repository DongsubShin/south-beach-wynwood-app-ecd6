import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-[#ED1C24]">
              South Beach Cuts & Wynwood Barbers
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-slate-600 hover:text-[#ED1C24] font-medium transition">Home</a>
            <a href="#services" className="text-slate-600 hover:text-[#ED1C24] font-medium transition">Services</a>
            <a href="#queue" className="text-slate-600 hover:text-[#ED1C24] font-medium transition">Live Queue</a>
            <Link 
              to="/book" 
              className="bg-[#ED1C24] text-white px-5 py-2.5 rounded-md font-semibold hover:bg-opacity-90 transition shadow-sm"
            >
              Book Now
            </Link>
          </div>
          <div className="md:hidden">
            <span className="iconify text-2xl text-[#ED1C24]" data-icon="lucide:menu"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;