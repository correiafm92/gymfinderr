
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface RatingCategoryProps {
  name: string;
  value: number;
}

const RatingCategory: React.FC<RatingCategoryProps> = ({ name, value }) => {
  // Convert 0-5 rating to 0-100 percentage
  const percentage = (value / 5) * 100;
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm font-medium">{value.toFixed(1)}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

export default RatingCategory;
