
import React from 'react';
import RatingCategory from '../RatingCategory';

interface GymRatingsSectionProps {
  rating: {
    space: number;
    equipment: number;
    valueForMoney: number;
    services: number;
    water: number;
    overall: number;
  };
}

const GymRatingsSection: React.FC<GymRatingsSectionProps> = ({ rating }) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-serif font-semibold mb-6">Avaliações</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <RatingCategory name="Espaço" value={rating.space} />
          </div>
          <div>
            <RatingCategory name="Máquinas" value={rating.equipment} />
          </div>
          <div>
            <RatingCategory name="Custo-benefício" value={rating.valueForMoney} />
          </div>
          <div>
            <RatingCategory name="Serviços gerais" value={rating.services} />
          </div>
          <div>
            <RatingCategory name="Água" value={rating.water} />
          </div>
          <div>
            <RatingCategory name="Avaliação geral" value={rating.overall} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymRatingsSection;
