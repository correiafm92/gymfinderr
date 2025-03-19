
import React from 'react';
import { Mail, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GymContactInfoProps {
  email: string;
  onRateClick: () => void;
}

const GymContactInfo: React.FC<GymContactInfoProps> = ({ email, onRateClick }) => {
  return (
    <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-serif font-semibold mb-4">Informações de Contato</h2>
        
        <div className="flex items-center mb-4">
          <Mail size={20} className="mr-3" />
          <span className="font-medium">{email || "contato@academia.com"}</span>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-black text-black hover:bg-gray-100"
          onClick={onRateClick}
        >
          <Star size={16} className="mr-2" />
          Avaliar Academia
        </Button>
      </div>
    </div>
  );
};

export default GymContactInfo;
