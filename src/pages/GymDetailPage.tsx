
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '../hooks/use-toast';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Gym } from '@/components/GymCard';

// Import new components
import GymHeader from '@/components/GymDetail/GymHeader';
import GymContactInfo from '@/components/GymDetail/GymContactInfo';
import GymDescription from '@/components/GymDetail/GymDescription';
import GymRatingsSection from '@/components/GymDetail/GymRatingsSection';
import CommentsSection from '@/components/GymDetail/CommentsSection';
import GymPricingSection from '@/components/GymDetail/GymPricingSection';
import RatingModal from '@/components/GymDetail/RatingModal';

const GymDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratings, setRatings] = useState({
    space: 0,
    equipment: 0,
    valueForMoney: 0,
    services: 0,
    water: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [gym, setGym] = useState<Gym | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      
      if (data.session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
        
        setProfile(profileData);
      }
    };
    
    checkUser();
    fetchGym();
  }, [id]);
  
  const fetchGym = async () => {
    try {
      setLoading(true);
      
      if (!id) return;
      
      const { data, error } = await supabase
        .from('gyms')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching gym:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes da academia",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      
      if (data) {
        // Transform data to match the Gym interface
        const transformedGym: Gym = {
          id: data.id,
          name: data.name,
          address: data.address,
          shortDescription: data.short_description,
          mainImage: data.main_image,
          email: data.email,
          cnpj: data.cnpj,
          description: data.description,
          amenities: data.amenities,
          images: data.images || [],
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
            daily: data.daily_price,
            monthly: data.monthly_price,
            quarterly: data.quarterly_price,
            yearly: data.yearly_price
          }
        };
        
        setGym(transformedGym);
      } else {
        setGym(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setGym(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center py-16">
            <h1 className="text-3xl font-serif mb-4">Carregando...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!gym) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center py-16">
            <h1 className="text-3xl font-serif mb-4">Academia não encontrada</h1>
            <p className="text-gray-600 mb-8">
              Desculpe, não encontramos a academia que você está procurando.
            </p>
            <Button onClick={() => window.history.back()} className="bg-black hover:bg-gray-800">
              Voltar
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleRatingChange = (category: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const calculateOverallRating = () => {
    const { space, equipment, valueForMoney, services, water } = ratings;
    return ((space + equipment + valueForMoney + services + water) / 5).toFixed(1);
  };

  const handleSubmitRating = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para avaliar.",
        duration: 3000,
      });
      setIsRatingModalOpen(false);
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('gym_ratings')
        .insert([
          {
            gym_id: id,
            user_name: profile?.username || user.email,
            space_rating: ratings.space,
            equipment_rating: ratings.equipment,
            value_rating: ratings.valueForMoney,
            services_rating: ratings.services,
            water_rating: ratings.water,
            overall_rating: Number(calculateOverallRating()),
            user_id: user.id
          },
        ]);

      if (error) {
        console.error('Error submitting rating:', error);
        toast({
          title: "Erro",
          description: "Não foi possível enviar sua avaliação. Tente novamente mais tarde.",
          duration: 3000,
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Avaliação enviada",
        description: "Obrigado por avaliar esta academia!",
        duration: 3000,
      });
      
      setIsRatingModalOpen(false);
      setRatings({
        space: 0,
        equipment: 0,
        valueForMoney: 0,
        services: 0,
        water: 0,
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua avaliação. Tente novamente mais tarde.",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingButtonClick = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para avaliar.",
        duration: 3000,
      });
      navigate('/login');
      return;
    }
    
    setIsRatingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Gym Info */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <GymHeader
                name={gym.name}
                address={gym.address}
                rating={gym.rating.overall}
                reviews={gym.reviews}
                images={gym.images || []}
              />
              
              <GymContactInfo
                email={gym.email || "contato@academia.com"}
                onRateClick={handleRatingButtonClick}
              />
            </div>
          </div>
        </section>
        
        {/* Description */}
        <GymDescription 
          description={gym.description || ''} 
          amenities={gym.amenities || []}
        />
        
        {/* Ratings */}
        <GymRatingsSection rating={gym.rating} />
        
        {/* Comments Section */}
        <CommentsSection gymId={id || ''} />
        
        {/* Pricing */}
        <GymPricingSection pricing={gym.pricing} />
      </main>
      
      <Footer />
      
      {/* Rating Modal */}
      <RatingModal
        open={isRatingModalOpen}
        onOpenChange={setIsRatingModalOpen}
        gymName={gym.name}
        ratings={ratings}
        onRatingChange={handleRatingChange}
        onSubmit={handleSubmitRating}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default GymDetailPage;
