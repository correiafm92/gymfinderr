
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Dumbbell, Star, Users, MapPin, ThumbsUp } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 mb-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6 text-center animate-fade-in">
              Sobre o GymFinder
            </h1>
            <p className="text-xl text-gray-600 mb-12 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Conectando pessoas a academias em todo o Brasil
            </p>
            
            <div className="prose prose-lg max-w-none animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p>
                O GymFinder nasceu da necessidade de facilitar a busca por academias de qualidade em todo o território brasileiro. Nossa missão é conectar pessoas que buscam uma vida mais saudável com as melhores opções de academias disponíveis em sua região.
              </p>
              
              <p>
                Seja você um viajante que precisa de uma academia durante sua estadia em outra cidade, ou alguém que busca uma nova academia no seu bairro, o GymFinder oferece todas as informações necessárias para você tomar a melhor decisão.
              </p>
              
              <h2 className="font-serif text-2xl mt-12 mb-6">Nossa Missão</h2>
              <p>
                Acreditamos que a prática regular de exercícios físicos é fundamental para uma vida saudável e equilibrada. Por isso, nossa missão é democratizar o acesso à informação sobre academias, facilitando a tomada de decisão e incentivando mais pessoas a iniciarem ou manterem sua rotina de exercícios.
              </p>
              
              <h2 className="font-serif text-2xl mt-12 mb-6">O que oferecemos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-black text-white p-3 rounded-full">
                      <MapPin size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Busca inteligente</h3>
                    <p className="text-gray-600">
                      Encontre academias por cidade ou estado, com filtros para encontrar exatamente o que você procura.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-black text-white p-3 rounded-full">
                      <Star size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Avaliações detalhadas</h3>
                    <p className="text-gray-600">
                      Avaliações em múltiplas categorias, permitindo uma análise completa de cada estabelecimento.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-black text-white p-3 rounded-full">
                      <Dumbbell size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Informações completas</h3>
                    <p className="text-gray-600">
                      Fotos, preços, horários e infraestrutura disponível em cada academia.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="bg-black text-white p-3 rounded-full">
                      <Users size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Comunidade ativa</h3>
                    <p className="text-gray-600">
                      Avaliações e comentários de usuários reais que compartilham suas experiências.
                    </p>
                  </div>
                </div>
              </div>
              
              <h2 className="font-serif text-2xl mt-12 mb-6">Para academias</h2>
              <p>
                Se você é proprietário ou gerente de uma academia, o GymFinder também é para você! Cadastre seu estabelecimento em nossa plataforma e aumente sua visibilidade, atraindo novos clientes e recebendo feedback valioso dos usuários.
              </p>
              
              <div className="bg-gray-50 p-8 rounded-lg mt-8">
                <h3 className="font-serif text-xl mb-4">Vantagens para academias parceiras:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ThumbsUp size={18} className="mr-2 mt-0.5 text-black" />
                    <span>Maior visibilidade online</span>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp size={18} className="mr-2 mt-0.5 text-black" />
                    <span>Atração de novos clientes potenciais</span>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp size={18} className="mr-2 mt-0.5 text-black" />
                    <span>Feedback detalhado dos usuários</span>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp size={18} className="mr-2 mt-0.5 text-black" />
                    <span>Perfil personalizado com fotos e informações completas</span>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp size={18} className="mr-2 mt-0.5 text-black" />
                    <span>Análise de performance e comparativo com concorrentes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
