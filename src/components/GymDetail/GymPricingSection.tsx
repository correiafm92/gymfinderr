
import React from 'react';
import PricingTable from '../PricingTable';

interface GymPricingSectionProps {
  pricing: {
    daily: number;
    monthly: number;
    quarterly: number;
    yearly: number;
  };
}

const GymPricingSection: React.FC<GymPricingSectionProps> = ({ pricing }) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-serif font-semibold mb-8">Planos e Preços</h2>
        <PricingTable pricing={pricing} />
      </div>
    </section>
  );
};

export default GymPricingSection;
