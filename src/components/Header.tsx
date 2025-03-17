
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8 w-full bg-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-black">
          <img 
            src="https://i.postimg.cc/GtTst108/A-3-D-cartoon-panda-serious-yet-smiling-sits-on-a-gym-floor-holding-a-dumbbell-He-wears-a-white.png" 
            alt="GymFinder Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-semibold font-serif">GymFinder</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-black hover:text-gray-600 transition-colors duration-200 font-sans text-sm">
            Início
          </Link>
          <Link to="/about" className="text-black hover:text-gray-600 transition-colors duration-200 font-sans text-sm">
            Sobre
          </Link>
          <Link to="/contact" className="text-black hover:text-gray-600 transition-colors duration-200 font-sans text-sm">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
