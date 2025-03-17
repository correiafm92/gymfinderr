
// Tipos de dados para o FitFinder Brazil

export interface Location {
  state: string;
  city: string;
}

export interface GymRating {
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
  location: Location;
  address: string;
  description: string;
  shortDescription: string;
  phone: string;
  images: string[];
  mainImage: string;
  pricing: {
    daily: number;
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  amenities: string[];
  rating: GymRating;
  reviews: number;
}
