
import { Gym } from './types';

const generateRandomRating = () => {
  return {
    space: Number((Math.random() * 2 + 3).toFixed(1)),
    equipment: Number((Math.random() * 2 + 3).toFixed(1)),
    valueForMoney: Number((Math.random() * 2 + 3).toFixed(1)),
    services: Number((Math.random() * 2 + 3).toFixed(1)),
    water: Number((Math.random() * 2 + 3).toFixed(1)),
    get overall() {
      return Number(((this.space + this.equipment + this.valueForMoney + this.services + this.water) / 5).toFixed(1));
    }
  };
};

export const BRAZILIAN_STATES = [
  { name: 'São Paulo', abbr: 'SP' },
  { name: 'Rio de Janeiro', abbr: 'RJ' },
  { name: 'Minas Gerais', abbr: 'MG' },
  { name: 'Bahia', abbr: 'BA' },
  { name: 'Paraná', abbr: 'PR' },
  { name: 'Rio Grande do Sul', abbr: 'RS' },
  { name: 'Pernambuco', abbr: 'PE' },
  { name: 'Ceará', abbr: 'CE' },
  { name: 'Pará', abbr: 'PA' },
  { name: 'Santa Catarina', abbr: 'SC' },
];

export const CITIES_BY_STATE: Record<string, string[]> = {
  'SP': ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto', 'São José dos Campos'],
  'RJ': ['Rio de Janeiro', 'Niterói', 'Petrópolis', 'Volta Redonda', 'Campos dos Goytacazes'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Juiz de Fora', 'Contagem', 'Montes Claros'],
  'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna'],
  'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel'],
  'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria'],
  'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina'],
  'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral'],
  'PA': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal'],
  'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Chapecó'],
};

const gymNames = [
  'Academia PowerFit',
  'SmartGym Brasil',
  'Clube Fitness Elite',
  'Academia VitaFit',
  'Centro Físico Total',
  'Studio Força e Forma',
  'Boa Forma Academia',
  'Espaço Fitness Conceito',
  'Academia Alpha',
  'Studio Corpo em Movimento',
  'Integração Fitness',
  'Academia Equilíbrio',
  'Centro Atlético Prime',
  'Espaço Saúde Total',
  'Academia Nova Era'
];

const amenities = [
  'Estacionamento',
  'Vestiários com chuveiros',
  'Armários',
  'Ar condicionado',
  'Wi-Fi grátis',
  'Loja de suplementos',
  'Avaliação física',
  'Personal trainer',
  'Musculação',
  'Área cardio',
  'Aulas coletivas',
  'Área funcional',
  'Sauna',
  'Piscina',
  'Boxe/MMA'
];

const gymDescriptions = [
  'Nossa academia possui equipamentos de última geração e uma equipe altamente qualificada para te ajudar a alcançar seus objetivos. Contamos com amplo espaço para treinos e diversas modalidades.',
  'Um espaço completo para cuidar da sua saúde. Oferecemos equipamentos modernos, aulas variadas e profissionais capacitados para te guiar em sua jornada fitness.',
  'Ambiente clean e sofisticado para o seu treino diário. Nossa academia conta com equipamentos premium e uma metodologia de treino que garantem resultados rápidos e duradouros.',
  'Somos especializados em proporcionar experiências de treino personalizadas. Nossa equipe de profissionais está pronta para te ajudar a alcançar o melhor da sua performance.',
  'Mais que uma academia, um espaço de transformação. Aqui você encontra toda a estrutura necessária para mudar seu corpo e sua mente, com acompanhamento especializado.'
];

const shortDescriptions = [
  'Academia completa com equipamentos modernos e profissionais qualificados',
  'Espaço amplo com diversas modalidades e estacionamento',
  'Treino personalizado com foco em resultados rápidos',
  'Academia premium com ambiente sofisticado e equipamentos de ponta',
  'Estrutura completa para cuidar da sua saúde física e mental',
];

const generateMockGyms = (): Gym[] => {
  const gyms: Gym[] = [];
  let id = 1;

  BRAZILIAN_STATES.forEach(state => {
    CITIES_BY_STATE[state.abbr].forEach(city => {
      // Generate 3-5 gyms per city
      const numGyms = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < numGyms; i++) {
        const gymNameIndex = Math.floor(Math.random() * gymNames.length);
        const gymDescIndex = Math.floor(Math.random() * gymDescriptions.length);
        const shortDescIndex = Math.floor(Math.random() * shortDescriptions.length);
        
        // Select 5-8 random amenities
        const numAmenities = Math.floor(Math.random() * 4) + 5;
        const gymAmenities = [...amenities]
          .sort(() => 0.5 - Math.random())
          .slice(0, numAmenities);
        
        // Generate random pricing
        const dailyPrice = Math.floor(Math.random() * 30) + 20; // 20-50 reais
        
        gyms.push({
          id: String(id++),
          name: `${gymNames[gymNameIndex]} ${city}`,
          location: {
            state: state.name,
            city: city
          },
          address: `Rua ${state.name}, ${Math.floor(Math.random() * 1000) + 100}, ${city}, ${state.abbr}`,
          description: gymDescriptions[gymDescIndex],
          shortDescription: shortDescriptions[shortDescIndex],
          phone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
          images: [
            `/gym-${Math.floor(Math.random() * 5) + 1}.jpg`,
            `/gym-${Math.floor(Math.random() * 5) + 1}.jpg`,
            `/gym-${Math.floor(Math.random() * 5) + 1}.jpg`,
            `/gym-${Math.floor(Math.random() * 5) + 1}.jpg`
          ],
          mainImage: `/gym-${Math.floor(Math.random() * 5) + 1}.jpg`,
          pricing: {
            daily: dailyPrice,
            monthly: dailyPrice * 15,
            quarterly: dailyPrice * 15 * 3 * 0.9, // 10% discount
            yearly: dailyPrice * 15 * 12 * 0.7, // 30% discount
          },
          amenities: gymAmenities,
          rating: generateRandomRating(),
          reviews: Math.floor(Math.random() * 200) + 5,
        });
      }
    });
  });

  return gyms;
};

export const mockGyms = generateMockGyms();

export const getGymsByStateAndCity = (state: string, city: string): Gym[] => {
  return mockGyms.filter(
    gym => gym.location.state === state && gym.location.city === city
  );
};

export const getGymById = (id: string): Gym | undefined => {
  return mockGyms.find(gym => gym.id === id);
};
