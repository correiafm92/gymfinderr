
import React from 'react';
import { Check } from 'lucide-react';

interface GymAmenitiesProps {
  amenities: string[];
}

const GymAmenities: React.FC<GymAmenitiesProps> = ({ amenities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {amenities.map((amenity, index) => (
        <div key={index} className="flex items-center">
          <Check size={18} className="mr-2 text-black" />
          <span className="text-sm">{amenity}</span>
        </div>
      ))}
    </div>
  );
};

export default GymAmenities;
