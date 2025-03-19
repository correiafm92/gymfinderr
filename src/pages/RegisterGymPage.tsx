import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { BRAZILIAN_STATES, CITIES_BY_STATE } from '@/data/mockData';
import { MapPin, Upload, Clock, Phone, Globe, Instagram, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { v4 as uuidv4 } from 'uuid';

// CNPJ validation function
const validateCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  if (cnpj.length !== 14) return false;
  
  // Check for repeated digits (all same number)
  if (/^(\d)\1+$/.test(cnpj)) return false;
  
  // Validate check digits
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  
  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;
  
  return true;
};

const gymSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().min(20, 'Descrição deve ter pelo menos 20 caracteres'),
  shortDescription: z.string().min(10, 'Descrição curta deve ter pelo menos 10 caracteres'),
  cnpj: z.string()
    .min(14, 'CNPJ deve ter 14 dígitos')
    .refine(validateCNPJ, {
      message: 'CNPJ inválido'
    }),
  state: z.string().min(1, 'Selecione um estado'),
  city: z.string().min(1, 'Selecione uma cidade'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  email: z.string().email('Digite um e-mail válido'),
  website: z.string().optional(),
  instagram: z.string().optional(),
  openingHours: z.string().min(5, 'Horário de funcionamento deve ser informado'),
  amenities: z.array(z.string()).min(1, 'Selecione pelo menos 1 comodidade'),
  daily: z.string().min(1, 'Informe o preço da diária'),
  monthly: z.string().min(1, 'Informe o preço do plano mensal'),
  quarterly: z.string().min(1, 'Informe o preço do plano trimestral'),
  yearly: z.string().min(1, 'Informe o preço do plano anual'),
});

type GymFormValues = z.infer<typeof gymSchema>;

const RegisterGymPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  
  const amenitiesList = [
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

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      
      if (!data.session?.user) {
        toast({
          title: "Acesso restrito",
          description: "Você precisa estar logado para cadastrar uma academia.",
          variant: "destructive",
          duration: 3000,
        });
        navigate('/login');
      } else {
        // Check if user already has a gym
        try {
          const { data: gymData } = await supabase
            .from('gyms')
            .select('id')
            .eq('owner_id', data.session.user.id)
            .maybeSingle();
          
          if (gymData) {
            toast({
              title: "Estabelecimento já cadastrado",
              description: "Você já possui um estabelecimento cadastrado. Você será redirecionado para a página de edição.",
              duration: 3000,
            });
            navigate('/edit-gym');
          }
        } catch (error) {
          console.error("Error checking for existing gym:", error);
        }
      }
    };
    
    checkUser();
  }, [navigate, toast]);

  const form = useForm<GymFormValues>({
    resolver: zodResolver(gymSchema),
    defaultValues: {
      name: '',
      description: '',
      shortDescription: '',
      cnpj: '',
      state: '',
      city: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      instagram: '',
      openingHours: '',
      amenities: [],
      daily: '',
      monthly: '',
      quarterly: '',
      yearly: '',
    },
  });

  const watchState = form.watch('state');

  useEffect(() => {
    if (watchState) {
      const stateAbbr = BRAZILIAN_STATES.find(state => state.name === watchState)?.abbr || '';
      setCities(CITIES_BY_STATE[stateAbbr] || []);
      form.setValue('city', '');
    } else {
      setCities([]);
    }
  }, [watchState, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedImages(prevImages => [...prevImages, ...filesArray].slice(0, 6));
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: GymFormValues) => {
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para cadastrar uma academia.",
        variant: "destructive",
        duration: 3000,
      });
      navigate('/login');
      return;
    }
    
    setLoading(true);
    
    try {
      // Upload images to Supabase storage
      const imageUrls: string[] = [];
      
      if (uploadedImages.length > 0) {
        for (const image of uploadedImages) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${uuidv4()}.${fileExt}`;
          const filePath = `gyms/${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from('gym_images')
            .upload(filePath, image);
            
          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            throw new Error('Erro ao enviar imagens. Tente novamente.');
          }
          
          const { data: publicUrl } = supabase.storage
            .from('gym_images')
            .getPublicUrl(filePath);
            
          imageUrls.push(publicUrl.publicUrl);
        }
      }
      
      // Create gym record in database
      try {
        const gymId = uuidv4();
        const { error } = await supabase
          .from('gyms')
          .insert([
            {
              id: gymId,
              name: data.name,
              description: data.description,
              short_description: data.shortDescription,
              cnpj: data.cnpj,
              state: data.state,
              city: data.city,
              address: data.address,
              phone: data.phone,
              email: data.email,
              website: data.website || null,
              instagram: data.instagram || null,
              opening_hours: data.openingHours,
              amenities: data.amenities,
              daily_price: parseFloat(data.daily),
              monthly_price: parseFloat(data.monthly),
              quarterly_price: parseFloat(data.quarterly),
              yearly_price: parseFloat(data.yearly),
              images: imageUrls,
              main_image: imageUrls.length > 0 ? imageUrls[0] : null,
              owner_id: user.id,
              status: 'active', // Auto-approve gym
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
          ]);

        if (error) {
          console.error('Error creating gym:', error);
          throw new Error('Erro ao cadastrar academia. Tente novamente.');
        }
        
        toast({
          title: "Academia cadastrada com sucesso!",
          description: "Seu estabelecimento foi cadastrado e já está disponível para visualização.",
          duration: 5000,
        });
        
        navigate(`/gym/${gymId}`);
      } catch (error) {
        console.error('Error inserting gym data:', error);
        throw new Error('Erro ao inserir dados da academia. Tente novamente.');
      }
    } catch (error: any) {
      console.error('Error registering gym:', error);
      toast({
        title: "Erro ao cadastrar academia",
        description: error.message || "Ocorreu um erro ao cadastrar seu estabelecimento. Tente novamente mais tarde.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // User is redirected in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-semibold text-center mb-2">Cadastrar Estabelecimento</h1>
          <p className="text-gray-600 text-center mb-8">Preencha o formulário abaixo com as informações do seu estabelecimento</p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-medium mb-4">Informações Básicas</h2>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Estabelecimento</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ex: Academia PowerFit" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ex: 12345678000123" />
                        </FormControl>
                        <FormDescription>
                          Informe o CNPJ do estabelecimento (apenas números)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição Curta</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ex: Academia completa com equipamentos modernos" />
                        </FormControl>
                        <FormDescription>
                          Uma breve descrição que aparecerá nos resultados de busca
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição Completa</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Descreva seu estabelecimento em detalhes..."
                            className="min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-medium mb-4">Localização</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BRAZILIAN_STATES.map((state) => (
                              <SelectItem key={state.abbr} value={state.name}>
                                {state.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={cities.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma cidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço Completo</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="relative flex-grow">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                {...field} 
                                className="pl-9" 
                                placeholder="Rua, número, bairro, CEP"
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-medium mb-4">Contato e Funcionamento</h2>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              {...field} 
                              className="pl-9" 
                              placeholder="(11) 99999-9999"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              {...field} 
                              type="email"
                              className="pl-9" 
                              placeholder="contato@suaacademia.com.br"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (opcional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              {...field} 
                              className="pl-9" 
                              placeholder="https://www.seusite.com.br"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram (opcional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              {...field} 
                              className="pl-9" 
                              placeholder="@suaacademia"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="openingHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário de Funcionamento</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              {...field} 
                              className="pl-9" 
                              placeholder="Ex: Segunda a Sexta: 6h às 23h, Sábado: 8h às 18h"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-medium mb-4">Fotos do Estabelecimento</h2>
                
                <div className="mb-4">
                  <Label htmlFor="images" className="block mb-2">
                    Adicione até 6 fotos do seu estabelecimento
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Clique para fazer upload ou arraste as imagens aqui
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG ou JPEG (máx. 10MB por arquivo)
                      </p>
                    </label>
                  </div>
                </div>
                
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Imagens Adicionadas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-medium mb-4">Comodidades e Facilidades</h2>
                
                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Selecione as comodidades disponíveis</FormLabel>
                        <FormDescription>
                          Marque todas as opções que seu estabelecimento oferece
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {amenitiesList.map((amenity) => (
                          <FormField
                            key={amenity}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={amenity}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(amenity)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, amenity])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== amenity
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {amenity}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-medium mb-4">Preços e Planos</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="daily"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço da Diária (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="Ex: 35" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="monthly"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plano Mensal (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="Ex: 120" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="quarterly"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plano Trimestral (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="Ex: 320" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="yearly"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plano Anual (R$)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" placeholder="Ex: 1100" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800"
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Estabelecimento'}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterGymPage;
