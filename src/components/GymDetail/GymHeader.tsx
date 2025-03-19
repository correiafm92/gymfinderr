
import React from 'react';
import RatingStars from '../RatingStars';
import { MapPin } from 'lucide-react';
import ImageGallery from '../ImageGallery';

interface GymHeaderProps {
  name: string;
  address: string;
  rating: number;
  reviews: number;
  images: string[];
}

const GymHeader: React.FC<GymHeaderProps> = ({ 
  name, 
  address, 
  rating, 
  reviews, 
  images 
}) => {
  return (
    <div className="lg:col-span-2">
      <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4 animate-fade-in">{name}</h1>
      
      <div className="flex items-center mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <RatingStars rating={rating} size={20} />
        <span className="ml-2 text-lg font-medium">{rating}</span>
        <span className="ml-1 text-gray-500">({reviews} avaliações)</span>
      </div>
      
      <div className="flex items-start mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <MapPin size={20} className="mt-1 mr-2 flex-shrink-0" />
        <p className="text-gray-700">{address}</p>
      </div>
      
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <ImageGallery images={images} altText={name} />
      </div>
    </div>
  );
};

export default GymHeader;
