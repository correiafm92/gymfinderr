
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import RatingStars from '../RatingStars';

interface RatingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gymName: string;
  ratings: {
    space: number;
    equipment: number;
    valueForMoney: number;
    services: number;
    water: number;
  };
  onRatingChange: (category: string, value: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const RatingModal: React.FC<RatingModalProps> = ({
  open,
  onOpenChange,
  gymName,
  ratings,
  onRatingChange,
  onSubmit,
  isSubmitting
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold font-serif">Avaliar {gymName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 my-6">            
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <Label className="font-medium">Espaço</Label>
              <RatingStars 
                rating={ratings.space} 
                size={24} 
                interactive={true}
                onRatingChange={(value) => onRatingChange('space', value)}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Label className="font-medium">Máquinas</Label>
              <RatingStars 
                rating={ratings.equipment} 
                size={24} 
                interactive={true}
                onRatingChange={(value) => onRatingChange('equipment', value)}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Label className="font-medium">Custo-benefício</Label>
              <RatingStars 
                rating={ratings.valueForMoney} 
                size={24} 
                interactive={true}
                onRatingChange={(value) => onRatingChange('valueForMoney', value)}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Label className="font-medium">Serviços gerais</Label>
              <RatingStars 
                rating={ratings.services} 
                size={24} 
                interactive={true}
                onRatingChange={(value) => onRatingChange('services', value)}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Label className="font-medium">Água</Label>
              <RatingStars 
                rating={ratings.water} 
                size={24} 
                interactive={true}
                onRatingChange={(value) => onRatingChange('water', value)}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-black text-black hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button 
            onClick={onSubmit}
            className="bg-black hover:bg-gray-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
