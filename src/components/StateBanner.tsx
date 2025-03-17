
import React from 'react';

interface StateBannerProps {
  state: string;
  city: string;
}

const StateBanner: React.FC<StateBannerProps> = ({ state, city }) => {
  return (
    <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 w-full text-center animate-fade-in">
      <h1 className="text-3xl md:text-5xl font-serif font-medium mb-4">{city}</h1>
      <p className="text-lg md:text-xl font-sans font-light">{state}, Brasil</p>
    </div>
  );
};

export default StateBanner;
