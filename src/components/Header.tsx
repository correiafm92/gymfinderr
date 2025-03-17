
import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8 w-full bg-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-black">
          <Dumbbell size={24} />
          <span className="text-xl font-semibold font-serif">FitFinder Brazil</span>
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
