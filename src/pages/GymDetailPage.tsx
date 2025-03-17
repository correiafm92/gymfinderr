
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGymById } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RatingStars from '../components/RatingStars';
import RatingCategory from '../components/RatingCategory';
import GymAmenities from '../components/GymAmenities';
import PricingTable from '../components/PricingTable';
import ImageGallery from '../components/ImageGallery';
import { MapPin, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '../hooks/use-toast';

const GymDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  
  const gym = getGymById(id || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  const handleCallGym = () => {
    toast({
      title: "Contato",
      description: `Ligando para ${gym.phone}`,
      duration: 3000,
    });
  };

  const handleSubmitRating = () => {
    toast({
      title: "Avaliação enviada",
      description: "Obrigado por avaliar esta academia!",
      duration: 3000,
    });
    setIsRatingModalOpen(false);
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
                  <ImageGallery images={gym.images} altText={gym.name} />
                </div>
              </div>
              
              <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                  <h2 className="text-xl font-serif font-semibold mb-4">Informações de Contato</h2>
                  
                  <div className="flex items-center mb-4">
                    <Phone size={20} className="mr-3" />
                    <span className="font-medium">{gym.phone}</span>
                  </div>
                  
                  <Button onClick={handleCallGym} className="w-full bg-black hover:bg-gray-800 mb-4">
                    Ligar para Academia
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-black text-black hover:bg-gray-100"
                    onClick={() => setIsRatingModalOpen(true)}
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
            <GymAmenities amenities={gym.amenities} />
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
        
        {/* Pricing */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-serif font-semibold mb-8">Planos e Preços</h2>
            <PricingTable pricing={gym.pricing} />
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Rating Modal */}
      {isRatingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full animate-scale-in">
            <h3 className="text-xl font-semibold font-serif mb-4">Avaliar {gym.name}</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Espaço</label>
                <div className="flex">
                  <RatingStars rating={0} size={24} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Máquinas</label>
                <div className="flex">
                  <RatingStars rating={0} size={24} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Custo-benefício</label>
                <div className="flex">
                  <RatingStars rating={0} size={24} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Serviços gerais</label>
                <div className="flex">
                  <RatingStars rating={0} size={24} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Água</label>
                <div className="flex">
                  <RatingStars rating={0} size={24} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
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
              >
                Enviar Avaliação
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymDetailPage;
