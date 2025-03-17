import React from 'react';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Star, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-semibold font-serif tracking-tight mb-6 animate-fade-in">
              Encontre a <span className="border-b-4 border-black pb-1">academia perfeita</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Compare preços, veja avaliações e encontre a melhor academia para seu treino em qualquer cidade do Brasil.
            </p>
            
            <div className="mt-8 mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <SearchBar />
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-12">Como funciona o GymFinder</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="bg-black text-white p-3 rounded-full mb-6">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-semibold font-serif mb-4">Encontre academias próximas</h3>
                <p className="text-gray-600">Pesquise por estado e cidade para descobrir as melhores academias disponíveis na sua região.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="bg-black text-white p-3 rounded-full mb-6">
                  <Star size={24} />
                </div>
                <h3 className="text-xl font-semibold font-serif mb-4">Compare e avalie</h3>
                <p className="text-gray-600">Veja fotos, preços e avaliações detalhadas para tomar a melhor decisão para o seu treino.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="bg-black text-white p-3 rounded-full mb-6">
                  <Dumbbell size={24} />
                </div>
                <h3 className="text-xl font-semibold font-serif mb-4">Comece a treinar</h3>
                <p className="text-gray-600">Entre em contato diretamente com a academia escolhida e comece sua jornada fitness.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Popular Cities */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-12">Cidades Populares</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/gyms/São Paulo/São Paulo" className="group relative h-48 overflow-hidden rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <img src="/sao-paulo.jpg" alt="São Paulo" className="w-full h-full object-cover brightness-75 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-serif font-medium">São Paulo</h3>
                </div>
              </Link>
              
              <Link to="/gyms/Rio de Janeiro/Rio de Janeiro" className="group relative h-48 overflow-hidden rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <img src="/rio.jpg" alt="Rio de Janeiro" className="w-full h-full object-cover brightness-75 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-serif font-medium">Rio de Janeiro</h3>
                </div>
              </Link>
              
              <Link to="/gyms/Minas Gerais/Belo Horizonte" className="group relative h-48 overflow-hidden rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <img src="/belo-horizonte.jpg" alt="Belo Horizonte" className="w-full h-full object-cover brightness-75 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-serif font-medium">Belo Horizonte</h3>
                </div>
              </Link>
              
              <Link to="/gyms/Rio Grande do Sul/Porto Alegre" className="group relative h-48 overflow-hidden rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <img src="/porto-alegre.jpg" alt="Porto Alegre" className="w-full h-full object-cover brightness-75 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-serif font-medium">Porto Alegre</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 animate-fade-in">Pronto para encontrar sua academia ideal?</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Comece sua busca agora e descubra centenas de academias em todo o Brasil.
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/" className="inline-block bg-white text-black py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Buscar Academias
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
