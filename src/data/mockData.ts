
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
  { name: 'Acre', abbr: 'AC' },
  { name: 'Alagoas', abbr: 'AL' },
  { name: 'Amapá', abbr: 'AP' },
  { name: 'Amazonas', abbr: 'AM' },
  { name: 'Bahia', abbr: 'BA' },
  { name: 'Ceará', abbr: 'CE' },
  { name: 'Distrito Federal', abbr: 'DF' },
  { name: 'Espírito Santo', abbr: 'ES' },
  { name: 'Goiás', abbr: 'GO' },
  { name: 'Maranhão', abbr: 'MA' },
  { name: 'Mato Grosso', abbr: 'MT' },
  { name: 'Mato Grosso do Sul', abbr: 'MS' },
  { name: 'Minas Gerais', abbr: 'MG' },
  { name: 'Pará', abbr: 'PA' },
  { name: 'Paraíba', abbr: 'PB' },
  { name: 'Paraná', abbr: 'PR' },
  { name: 'Pernambuco', abbr: 'PE' },
  { name: 'Piauí', abbr: 'PI' },
  { name: 'Rio de Janeiro', abbr: 'RJ' },
  { name: 'Rio Grande do Norte', abbr: 'RN' },
  { name: 'Rio Grande do Sul', abbr: 'RS' },
  { name: 'Rondônia', abbr: 'RO' },
  { name: 'Roraima', abbr: 'RR' },
  { name: 'Santa Catarina', abbr: 'SC' },
  { name: 'São Paulo', abbr: 'SP' },
  { name: 'Sergipe', abbr: 'SE' },
  { name: 'Tocantins', abbr: 'TO' },
];

export const CITIES_BY_STATE: Record<string, string[]> = {
  'AC': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó'],
  'AL': ['Maceió', 'Arapiraca', 'Rio Largo', 'Palmeira dos Índios', 'Penedo'],
  'AP': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão'],
  'AM': ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'],
  'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna'],
  'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral'],
  'DF': ['Brasília', 'Ceilândia', 'Taguatinga', 'Samambaia', 'Plano Piloto'],
  'ES': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Linhares'],
  'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia'],
  'MA': ['São Luís', 'Imperatriz', 'Timon', 'Caxias', 'Codó'],
  'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra'],
  'MS': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim'],
  'PA': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal'],
  'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux'],
  'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel'],
  'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina'],
  'PI': ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano'],
  'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói'],
  'RN': ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba'],
  'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria'],
  'RO': ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal'],
  'RR': ['Boa Vista', 'Caracaraí', 'Rorainópolis', 'Alto Alegre', 'Mucajaí'],
  'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Chapecó'],
  'SP': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André'],
  'SE': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão'],
  'TO': ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins'],
};

export const mockGyms: Gym[] = [];

export const getGymsByStateAndCity = (state: string, city: string): Gym[] => {
  return mockGyms.filter(
    gym => gym.location.state === state && gym.location.city === city
  );
};

export const getGymById = (id: string): Gym | undefined => {
  return mockGyms.find(gym => gym.id === id);
};
