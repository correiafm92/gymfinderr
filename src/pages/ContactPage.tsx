
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const ContactPage: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Mensagem enviada",
      description: "Agradecemos seu contato! Responderemos em breve.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 mb-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6 text-center animate-fade-in">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Tem dúvidas, sugestões ou quer cadastrar sua academia? Entre em contato conosco.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div>
                <h2 className="text-2xl font-serif mb-6">Envie uma mensagem</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Nome
                      </label>
                      <Input 
                        id="name" 
                        placeholder="Seu nome" 
                        required 
                        className="w-full border-gray-300 focus:border-black focus:ring-black"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Seu email" 
                        required 
                        className="w-full border-gray-300 focus:border-black focus:ring-black"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Assunto
                    </label>
                    <Input 
                      id="subject" 
                      placeholder="Assunto da mensagem" 
                      required 
                      className="w-full border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Mensagem
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Escreva sua mensagem aqui..." 
                      rows={6} 
                      required 
                      className="w-full border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>
                  
                  <Button type="submit" className="bg-black hover:bg-gray-800">
                    <Send size={16} className="mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-serif mb-6">Informações de Contato</h2>
                
                <div className="space-y-8">
                  <div className="flex">
                    <div className="mr-4">
                      <div className="bg-black text-white p-3 rounded-full">
                        <Mail size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Email</h3>
                      <p className="text-gray-600">contato@fitfinder.com.br</p>
                      <p className="text-gray-600">suporte@fitfinder.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4">
                      <div className="bg-black text-white p-3 rounded-full">
                        <Phone size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Telefone</h3>
                      <p className="text-gray-600">(11) 99999-9999</p>
                      <p className="text-gray-600">(11) 3333-3333</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4">
                      <div className="bg-black text-white p-3 rounded-full">
                        <MapPin size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Endereço</h3>
                      <p className="text-gray-600">
                        Av. Paulista, 1000 - Bela Vista<br />
                        São Paulo - SP, 01310-100<br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="font-medium text-lg mb-4">Horário de Atendimento</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Segunda a Sexta</span>
                      <span>8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sábado</span>
                      <span>9:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domingo</span>
                      <span>Fechado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
