
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { BRAZILIAN_STATES, CITIES_BY_STATE } from '../data/mockData';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SearchBar: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [cities, setCities] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedState) {
      const stateAbbr = BRAZILIAN_STATES.find(state => state.name === selectedState)?.abbr || '';
      setCities(CITIES_BY_STATE[stateAbbr] || []);
      setSelectedCity('');
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleSearch = () => {
    if (selectedState && selectedCity) {
      navigate(`/gyms/${selectedState}/${selectedCity}`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 transition-all duration-300 animate-fade-in">
      <h2 className="text-2xl font-serif text-center mb-6">Onde quer treinar?</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um estado" />
            </SelectTrigger>
            <SelectContent>
              {BRAZILIAN_STATES.map(state => (
                <SelectItem key={state.abbr} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedState}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma cidade" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          className="bg-black text-white hover:bg-gray-800 transition-colors" 
          onClick={handleSearch}
          disabled={!selectedState || !selectedCity}
        >
          <Search size={18} className="mr-2" />
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
