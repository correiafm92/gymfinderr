
import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="https://i.postimg.cc/GtTst108/A-3-D-cartoon-panda-serious-yet-smiling-sits-on-a-gym-floor-holding-a-dumbbell-He-wears-a-white.png" 
                alt="GymFinder Logo" 
                className="w-10 h-10 object-contain"
              />
              <h3 className="font-serif text-xl font-semibold">GymFinder</h3>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Encontre as melhores academias no Brasil e comece sua jornada fitness agora.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Links Rápidos</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-gray-600 hover:text-black transition-colors">Início</Link>
              <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">Sobre</Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contato</Link>
              <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Para Academias</a>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Cidades Populares</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/gyms/São Paulo/São Paulo" className="text-sm text-gray-600 hover:text-black transition-colors">São Paulo</Link>
              <Link to="/gyms/Rio de Janeiro/Rio de Janeiro" className="text-sm text-gray-600 hover:text-black transition-colors">Rio de Janeiro</Link>
              <Link to="/gyms/Minas Gerais/Belo Horizonte" className="text-sm text-gray-600 hover:text-black transition-colors">Belo Horizonte</Link>
              <Link to="/gyms/Bahia/Salvador" className="text-sm text-gray-600 hover:text-black transition-colors">Salvador</Link>
              <Link to="/gyms/Rio Grande do Sul/Porto Alegre" className="text-sm text-gray-600 hover:text-black transition-colors">Porto Alegre</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Contato</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={16} className="mr-2" />
                <span>contato@gymfinder.com.br</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={16} className="mr-2" />
                <span>(11) 99999-9999</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} GymFinder. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
