
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 16, className = '' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={`flex items-center space-x-0.5 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < fullStars ? 'black' : (i === fullStars && hasHalfStar ? 'url(#half)' : 'none')}
          color="black"
          className="transition-transform hover:scale-110"
        />
      ))}
    </div>
  );
};

export default RatingStars;
