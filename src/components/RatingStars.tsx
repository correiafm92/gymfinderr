
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 16, 
  className = '',
  interactive = false,
  onRatingChange
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const handleStarClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className={`flex items-center space-x-0.5 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < fullStars ? 'black' : (i === fullStars && hasHalfStar ? 'url(#half)' : 'none')}
          color="black"
          className={`transition-transform ${interactive ? 'cursor-pointer hover:scale-110' : ''}`}
          onClick={() => handleStarClick(i)}
          data-testid={`star-${i}`}
        />
      ))}
    </div>
  );
};

export default RatingStars;
