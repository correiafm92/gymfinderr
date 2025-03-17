
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
      
      // Set up auth listener
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
        }
      );
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    checkUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Desconectado",
        description: "Você foi desconectado com sucesso.",
        duration: 3000,
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao desconectar. Tente novamente.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8 w-full bg-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-black">
          <img 
            src="https://i.postimg.cc/GtTst108/A-3-D-cartoon-panda-serious-yet-smiling-sits-on-a-gym-floor-holding-a-dumbbell-He-wears-a-white.png" 
            alt="GymFinder Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-semibold font-serif">GymFinder</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-black hover:text-gray-600 transition-colors duration-200 font-sans text-sm">
              Início
            </Link>
            <Link to="/about" className="text-black hover:text-gray-600 transition-colors duration-200 font-sans text-sm">
              Sobre
            </Link>
            <Link to="/contact" className="text-black hover:text-gray-600 transition-colors duration-200 font-sans text-sm">
              Contato
            </Link>
          </nav>
          
          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="h-9 w-9 hover:ring-2 hover:ring-gray-200 transition-all cursor-pointer">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-black text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/login')}
                    className="border-black text-black hover:bg-gray-100"
                  >
                    Entrar
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => navigate('/register')}
                    className="bg-black hover:bg-gray-800"
                  >
                    Cadastrar
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
