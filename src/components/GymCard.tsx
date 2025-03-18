
import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import { MapPin } from 'lucide-react';

interface GymRating {
  space: number;
  equipment: number;
  valueForMoney: number;
  services: number;
  water: number;
  overall: number;
}

export interface Gym {
  id: string;
  name: string;
  address: string;
  shortDescription?: string;
  short_description?: string;
  mainImage?: string;
  main_image?: string;
  rating: GymRating;
  reviews: number;
  pricing: {
    daily: number;
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  daily_price?: number;
  monthly_price?: number;
  quarterly_price?: number;
  yearly_price?: number;
}

interface GymCardProps {
  gym: Gym;
}

const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  // Support both field naming conventions (camelCase and snake_case)
  const mainImage = gym.mainImage || gym.main_image;
  const shortDescription = gym.shortDescription || gym.short_description;
  const dailyPrice = gym.pricing?.daily || gym.daily_price;

  return (
    <Link 
      to={`/gym/${gym.id}`} 
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={mainImage} 
          alt={gym.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col p-4 grow">
        <h3 className="text-lg font-semibold font-serif line-clamp-1">{gym.name}</h3>
        <div className="flex items-center text-gray-600 mt-1">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm line-clamp-1">{gym.address}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{shortDescription}</p>
        <div className="mt-3 flex items-center">
          <RatingStars rating={gym.rating.overall} size={16} />
          <span className="ml-2 text-sm font-medium">{gym.rating.overall}</span>
          <span className="ml-1 text-sm text-gray-500">({gym.reviews})</span>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm font-medium">
            Diária a partir de <span className="font-bold">R$ {dailyPrice?.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GymCard;
