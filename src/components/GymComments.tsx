
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  user_name: string;
  comment: string;
  created_at: string;
}

interface GymCommentsProps {
  gymId: string;
}

const GymComments: React.FC<GymCommentsProps> = ({ gymId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [gymId]);

  const fetchComments = async () => {
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
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim() || !commentText.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e comentário.",
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
            user_name: userName,
            comment: commentText,
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

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-serif font-semibold mb-4">Comentários</h3>
      
      <form onSubmit={handleSubmitComment} className="space-y-4 p-4 border border-gray-200 rounded-lg">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium mb-1">Seu nome</label>
          <Input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="commentText" className="block text-sm font-medium mb-1">Comentário</label>
          <Textarea
            id="commentText"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Compartilhe sua experiência nesta academia..."
            className="w-full min-h-[100px]"
          />
        </div>
        
        <Button type="submit" className="bg-black hover:bg-gray-800" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar comentário"}
        </Button>
      </form>
      
      <div className="space-y-4 mt-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">Ainda não há comentários para esta academia. Seja o primeiro a comentar!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{comment.user_name}</h4>
                <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
              </div>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GymComments;
