
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GymCard from '../components/GymCard';
import StateBanner from '../components/StateBanner';
import SearchBar from '../components/SearchBar';
import { useToast } from '../hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Gym } from '@/components/GymCard';

const GymListPage: React.FC = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  const { toast } = useToast();
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGyms();
    
    // Set up real-time subscription for newly added gyms
    const subscription = supabase
      .channel('public:gyms')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'gyms' 
      }, (payload) => {
        // When a new gym is added, add it to the state
        const newGym = payload.new as any;
        setGyms(currentGyms => [
          ...currentGyms, 
          {
            id: newGym.id,
            name: newGym.name,
            address: newGym.address,
            shortDescription: newGym.short_description,
            mainImage: newGym.main_image,
            email: newGym.email,
            cnpj: newGym.cnpj,
            description: newGym.description,
            amenities: newGym.amenities,
            images: newGym.images,
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
              daily: newGym.daily_price,
              monthly: newGym.monthly_price,
              quarterly: newGym.quarterly_price,
              yearly: newGym.yearly_price
            }
          }
        ]);
      })
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [state, city]);

  const fetchGyms = async () => {
    try {
      setLoading(true);
      
      let query = supabase.from('gyms').select('*');
      
      if (state) {
        query = query.eq('state', state);
      }
      
      if (city) {
        query = query.eq('city', city);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching gyms:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as academias",
          variant: "destructive",
          duration: 3000,
        });
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

        setGyms(transformedGyms);
        
        if (state || city) {
          toast({
            title: "Academias carregadas",
            description: `Mostrando academias${city ? ` em ${city}` : ''}${state ? `, ${state}` : ''}`,
            duration: 3000,
          });
        }
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
                {loading ? 'Carregando academias...' : 
                  `${gyms.length} ${gyms.length === 1 ? 'academia encontrada' : 'academias encontradas'}`}
              </h2>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <p>Carregando academias...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gyms.map((gym) => (
                  <GymCard key={gym.id} gym={gym} />
                ))}
              </div>
            )}
            
            {!loading && gyms.length === 0 && (
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
