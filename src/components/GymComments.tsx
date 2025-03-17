
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface Comment {
  id: string;
  user_name: string;
  comment: string;
  created_at: string;
  user_id?: string;
}

interface GymCommentsProps {
  gymId: string;
}

const GymComments: React.FC<GymCommentsProps> = ({ gymId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingComments, setFetchingComments] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      
      if (data.session?.user) {
        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
        
        setProfile(profileData);
      }
    };
    
    checkUser();
    fetchComments();
  }, [gymId]);

  const fetchComments = async () => {
    setFetchingComments(true);
    try {
      const { data, error } = await supabase
        .from('gym_comments')
        .select('*')
        .eq('gym_id', gymId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setFetchingComments(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para comentar.",
        duration: 3000,
      });
      navigate('/login');
      return;
    }
    
    if (!commentText.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, digite seu comentário.",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('gym_comments')
        .insert([
          {
            gym_id: gymId,
            user_name: profile?.username || user.email,
            comment: commentText,
            user_id: user.id
          },
        ]);

      if (error) {
        console.error('Error adding comment:', error);
        toast({
          title: "Erro",
          description: "Não foi possível adicionar seu comentário. Tente novamente mais tarde.",
          duration: 3000,
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Comentário adicionado",
        description: "Seu comentário foi adicionado com sucesso!",
        duration: 3000,
      });
      
      setCommentText('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar seu comentário. Tente novamente mais tarde.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUserInitials = (userName: string) => {
    return userName.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-serif font-semibold mb-4">Comentários</h3>
      
      <Card className="border border-gray-200">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            {user ? (
              <>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-black text-white">
                      {getUserInitials(profile?.username || user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium mb-1">{profile?.username || user.email}</p>
                    <Textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Compartilhe sua experiência nesta academia..."
                      className="w-full min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-black hover:bg-gray-800" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Enviar comentário"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="mb-4 text-gray-600">
                  Você precisa estar logado para comentar.
                </p>
                <Button 
                  onClick={() => navigate('/login')} 
                  className="bg-black hover:bg-gray-800"
                >
                  Fazer login
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-4 mt-6">
        {fetchingComments ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 italic text-center py-8">
            Ainda não há comentários para esta academia. Seja o primeiro a comentar!
          </p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="border border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-200 text-gray-700">
                      {getUserInitials(comment.user_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{comment.user_name}</h4>
                      <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
                    </div>
                    <p className="text-gray-700">{comment.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default GymComments;
