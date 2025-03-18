
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { FcGoogle } from 'react-icons/fc';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          setError('Por favor, verifique seu email para confirmar seu cadastro antes de fazer login.');
        } else if (error.message.includes('Invalid login credentials')) {
          setError('Email ou senha incorretos. Tente novamente.');
        } else {
          setError(error.message || 'Ocorreu um erro durante o login. Tente novamente mais tarde.');
        }
        return;
      }
      
      if (data.user) {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
          duration: 3000,
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        console.error('Google login error:', error);
        if (error.message.includes('provider is not enabled')) {
          setError('Login com Google não está disponível no momento. Por favor, use email e senha.');
        } else {
          setError(error.message || 'Ocorreu um erro durante o login com Google. Tente novamente mais tarde.');
        }
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      setError('Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-2xl font-semibold text-center mb-6">Entrar na sua conta</h1>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-black">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full mb-4 border-gray-300"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Google
            </Button>
            
            <p className="text-center mt-6 text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-black font-medium hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
