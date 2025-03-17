
import React from 'react';
import { Check } from 'lucide-react';

interface PricingTableProps {
  pricing: {
    daily: number;
    monthly: number;
    quarterly: number;
    yearly: number;
  };
}

const PricingTable: React.FC<PricingTableProps> = ({ pricing }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
        <h3 className="font-serif text-lg font-semibold mb-2">Diária</h3>
        <p className="text-3xl font-bold mb-4">
          <span className="text-sm font-normal">R$</span> {pricing.daily.toFixed(2)}
        </p>
        <div className="space-y-3">
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Acesso por 1 dia</span>
          </div>
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Todas as áreas da academia</span>
          </div>
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Sem taxa de matrícula</span>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
        <h3 className="font-serif text-lg font-semibold mb-2">Mensal</h3>
        <p className="text-3xl font-bold mb-4">
          <span className="text-sm font-normal">R$</span> {pricing.monthly.toFixed(2)}
        </p>
        <div className="space-y-3">
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Acesso ilimitado por 30 dias</span>
          </div>
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Todas as áreas da academia</span>
          </div>
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Avaliação física inclusa</span>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
        <h3 className="font-serif text-lg font-semibold mb-2">Trimestral</h3>
        <p className="text-3xl font-bold mb-4">
          <span className="text-sm font-normal">R$</span> {pricing.quarterly.toFixed(2)}
        </p>
        <div className="space-y-3">
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Acesso por 3 meses</span>
          </div>
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Economize 10%</span>
          </div>
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">2 avaliações físicas</span>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
        <h3 className="font-serif text-lg font-semibold mb-2">Anual</h3>
        <p className="text-3xl font-bold mb-4">
          <span className="text-sm font-normal">R$</span> {pricing.yearly.toFixed(2)}
        </p>
        <div className="space-y-3">
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Acesso por 12 meses</span>
          </div>
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Economize 30%</span>
          </div>
          <div className="flex items-start">
            <Check size={18} className="mr-2 mt-0.5 text-black" />
            <span className="text-sm">Avaliações trimestrais</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
