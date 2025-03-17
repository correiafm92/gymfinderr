
import React from 'react';
import { Link } from 'react-router-dom';
import { Gym } from '../data/types';
import RatingStars from './RatingStars';
import { MapPin } from 'lucide-react';

interface GymCardProps {
  gym: Gym;
}

const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  return (
    <Link 
      to={`/gym/${gym.id}`} 
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={gym.mainImage} 
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
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{gym.shortDescription}</p>
        <div className="mt-3 flex items-center">
          <RatingStars rating={gym.rating.overall} size={16} />
          <span className="ml-2 text-sm font-medium">{gym.rating.overall}</span>
          <span className="ml-1 text-sm text-gray-500">({gym.reviews})</span>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm font-medium">
            Diária a partir de <span className="font-bold">R$ {gym.pricing.daily.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GymCard;
