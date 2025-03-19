
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RatingStars from '../components/RatingStars';
import RatingCategory from '../components/RatingCategory';
import GymAmenities from '../components/GymAmenities';
import PricingTable from '../components/PricingTable';
import ImageGallery from '../components/ImageGallery';
import GymComments from '../components/GymComments';
import { MapPin, Star, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Gym } from '@/components/GymCard';

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
  
  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
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
              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4 animate-fade-in">{gym.name}</h1>
                
                <div className="flex items-center mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <RatingStars rating={gym.rating.overall} size={20} />
                  <span className="ml-2 text-lg font-medium">{gym.rating.overall}</span>
                  <span className="ml-1 text-gray-500">({gym.reviews} avaliações)</span>
                </div>
                
                <div className="flex items-start mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <MapPin size={20} className="mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">{gym.address}</p>
                </div>
                
                <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <ImageGallery images={gym.images || []} altText={gym.name} />
                </div>
              </div>
              
              <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                  <h2 className="text-xl font-serif font-semibold mb-4">Informações de Contato</h2>
                  
                  <div className="flex items-center mb-4">
                    <Mail size={20} className="mr-3" />
                    <span className="font-medium">{gym.email || "contato@academia.com"}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-black text-black hover:bg-gray-100"
                    onClick={handleRatingButtonClick}
                  >
                    <Star size={16} className="mr-2" />
                    Avaliar Academia
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Description */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-serif font-semibold mb-6">Sobre a academia</h2>
            <p className="text-gray-700 leading-relaxed mb-8">{gym.description}</p>
            
            <h3 className="text-xl font-serif font-semibold mb-4">Infraestrutura e Serviços</h3>
            <GymAmenities amenities={gym.amenities || []} />
          </div>
        </section>
        
        {/* Ratings */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-serif font-semibold mb-6">Avaliações</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <RatingCategory name="Espaço" value={gym.rating.space} />
              </div>
              <div>
                <RatingCategory name="Máquinas" value={gym.rating.equipment} />
              </div>
              <div>
                <RatingCategory name="Custo-benefício" value={gym.rating.valueForMoney} />
              </div>
              <div>
                <RatingCategory name="Serviços gerais" value={gym.rating.services} />
              </div>
              <div>
                <RatingCategory name="Água" value={gym.rating.water} />
              </div>
              <div>
                <RatingCategory name="Avaliação geral" value={gym.rating.overall} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Comments Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <GymComments gymId={id || ''} />
          </div>
        </section>
        
        {/* Pricing */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-serif font-semibold mb-8">Planos e Preços</h2>
            <PricingTable pricing={gym.pricing} />
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Rating Modal */}
      <Dialog open={isRatingModalOpen} onOpenChange={setIsRatingModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold font-serif">Avaliar {gym.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-6">            
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <Label className="font-medium">Espaço</Label>
                <RatingStars 
                  rating={ratings.space} 
                  size={24} 
                  interactive={true}
                  onRatingChange={(value) => handleRatingChange('space', value)}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <Label className="font-medium">Máquinas</Label>
                <RatingStars 
                  rating={ratings.equipment} 
                  size={24} 
                  interactive={true}
                  onRatingChange={(value) => handleRatingChange('equipment', value)}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <Label className="font-medium">Custo-benefício</Label>
                <RatingStars 
                  rating={ratings.valueForMoney} 
                  size={24} 
                  interactive={true}
                  onRatingChange={(value) => handleRatingChange('valueForMoney', value)}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <Label className="font-medium">Serviços gerais</Label>
                <RatingStars 
                  rating={ratings.services} 
                  size={24} 
                  interactive={true}
                  onRatingChange={(value) => handleRatingChange('services', value)}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <Label className="font-medium">Água</Label>
                <RatingStars 
                  rating={ratings.water} 
                  size={24} 
                  interactive={true}
                  onRatingChange={(value) => handleRatingChange('water', value)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRatingModalOpen(false)}
              className="border-black text-black hover:bg-gray-100"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmitRating}
              className="bg-black hover:bg-gray-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GymDetailPage;
