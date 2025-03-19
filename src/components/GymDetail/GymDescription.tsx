
import React from 'react';
import GymAmenities from '../GymAmenities';

interface GymDescriptionProps {
  description: string;
  amenities: string[];
}

const GymDescription: React.FC<GymDescriptionProps> = ({ description, amenities }) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-serif font-semibold mb-6">Sobre a academia</h2>
        <p className="text-gray-700 leading-relaxed mb-8">{description}</p>
        
        <h3 className="text-xl font-serif font-semibold mb-4">Infraestrutura e Serviços</h3>
        <GymAmenities amenities={amenities} />
      </div>
    </section>
  );
};

export default GymDescription;
