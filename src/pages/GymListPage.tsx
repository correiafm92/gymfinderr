
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGymsByStateAndCity } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GymCard from '../components/GymCard';
import StateBanner from '../components/StateBanner';
import SearchBar from '../components/SearchBar';
import { useToast } from '../hooks/use-toast';

const GymListPage: React.FC = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state, city]);

  useEffect(() => {
    toast({
      title: "Academias carregadas",
      description: `Mostrando academias em ${city}, ${state}`,
      duration: 3000,
    });
  }, [state, city, toast]);

  // Fetch gyms for the selected location
  const gyms = getGymsByStateAndCity(state || '', city || '');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Location Banner */}
        <StateBanner state={state || ''} city={city || ''} />
        
        {/* Search Bar */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <SearchBar />
          </div>
        </section>
        
        {/* Gym Listings */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-serif">
                {gyms.length} {gyms.length === 1 ? 'academia encontrada' : 'academias encontradas'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gyms.map((gym) => (
                <GymCard key={gym.id} gym={gym} />
              ))}
            </div>
            
            {gyms.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Nenhuma academia encontrada</h3>
                <p className="text-gray-600">
                  Tente buscar em outra cidade ou estado.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GymListPage;
