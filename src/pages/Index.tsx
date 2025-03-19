
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Star, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import GymCard from '@/components/GymCard';
import { Gym } from '@/components/GymCard';

const Index: React.FC = () => {
  const [featuredGyms, setFeaturedGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGyms();
    
    // Set up real-time subscription for newly added gyms
    const subscription = supabase
      .channel('public:gyms')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'gyms' 
      }, (payload) => {
        // When a new gym is added, check if we need to update the featured gyms
        fetchGyms();
      })
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchGyms = async () => {
    try {
      const { data, error } = await supabase
        .from('gyms')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) {
        console.error('Error fetching gyms:', error);
        return;
      }

      if (data) {
        // Transform data to match the Gym interface
        const transformedGyms = data.map(gym => ({
          id: gym.id,
          name: gym.name,
          address: gym.address,
          shortDescription: gym.short_description,
          mainImage: gym.main_image,
          email: gym.email,
          cnpj: gym.cnpj,
          description: gym.description,
          amenities: gym.amenities,
          images: gym.images,
          rating: {
            space: 4.5,
            equipment: 4.5,
            valueForMoney: 4.5,
            services: 4.5,
            water: 4.5,
            overall: 4.5
          },
          reviews: 0,
          pricing: {
            daily: gym.daily_price,
            monthly: gym.monthly_price,
            quarterly: gym.quarterly_price,
            yearly: gym.yearly_price
          }
        }));

        setFeaturedGyms(transformedGyms);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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
        
        {/* Academias em Destaque */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-12">Academias em Destaque</h2>
            
            {loading ? (
              <div className="text-center py-10">
                <p>Carregando academias...</p>
              </div>
            ) : featuredGyms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {featuredGyms.map((gym) => (
                  <GymCard key={gym.id} gym={gym} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p>Nenhuma academia encontrada. Seja o primeiro a cadastrar!</p>
                <Link to="/register-gym" className="inline-block mt-4 bg-black text-white py-2 px-4 rounded">
                  Cadastrar Academia
                </Link>
              </div>
            )}
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
