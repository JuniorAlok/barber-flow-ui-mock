
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMockData } from '@/contexts/MockDataContext';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const homeContentSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  subtitle: z.string().min(1, 'Subtítulo é obrigatório'),
  ctaText: z.string().min(1, 'Texto do botão é obrigatório'),
  aboutTitle: z.string().min(1, 'Título da seção sobre é obrigatório'),
  aboutDescription: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  heroImageUrl: z.string().url('URL da imagem deve ser válida').optional().or(z.literal('')),
  contactPhone: z.string().min(1, 'Telefone é obrigatório'),
  contactAddress: z.string().min(1, 'Endereço é obrigatório'),
  contactEmail: z.string().email('Email deve ser válido'),
  workingHours: z.string().min(1, 'Horário de funcionamento é obrigatório'),
});

type HomeContentForm = z.infer<typeof homeContentSchema>;

const ConfigurationManagement: React.FC = () => {
  const { homeContent, setHomeContent } = useMockData();
  const { toast } = useToast();

  const form = useForm<HomeContentForm>({
    resolver: zodResolver(homeContentSchema),
    defaultValues: {
      title: homeContent.title,
      subtitle: homeContent.subtitle,
      ctaText: homeContent.ctaText,
      aboutTitle: homeContent.aboutTitle,
      aboutDescription: homeContent.aboutDescription,
      heroImageUrl: homeContent.heroImageUrl,
      contactPhone: homeContent.contactPhone,
      contactAddress: homeContent.contactAddress,
      contactEmail: homeContent.contactEmail,
      workingHours: homeContent.workingHours,
    },
  });

  const onSubmit = (data: HomeContentForm) => {
    console.log('Salvando configurações:', data);
    setHomeContent({
      title: data.title,
      subtitle: data.subtitle,
      ctaText: data.ctaText,
      aboutTitle: data.aboutTitle,
      aboutDescription: data.aboutDescription,
      heroImageUrl: data.heroImageUrl || homeContent.heroImageUrl,
      contactPhone: data.contactPhone,
      contactAddress: data.contactAddress,
      contactEmail: data.contactEmail,
      workingHours: data.workingHours,
    });
    
    toast({
      title: "Configurações salvas!",
      description: "As alterações na homepage foram aplicadas em tempo real.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Configurações da Homepage</h2>
        <p className="text-muted-foreground">
          Edite o conteúdo da homepage. As alterações são aplicadas em tempo real.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo da Homepage</CardTitle>
          <CardDescription>
            Configure os textos e imagens que aparecem na página inicial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título Principal</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da barbearia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ctaText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto do Botão</FormLabel>
                      <FormControl>
                        <Input placeholder="Agende Agora" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descrição da barbearia"
                        className="min-h-[60px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="heroImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da Imagem Principal</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://exemplo.com/imagem.jpg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Seção Sobre</h3>
                
                <FormField
                  control={form.control}
                  name="aboutTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título da Seção Sobre</FormLabel>
                      <FormControl>
                        <Input placeholder="Sobre Nós" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aboutDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição da Seção Sobre</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Conte a história da sua barbearia..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações de Contato</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="contato@barbearia.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contactAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua da Barbearia, 123 - Cidade, Estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workingHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário de Funcionamento</FormLabel>
                      <FormControl>
                        <Input placeholder="Seg-Sáb: 9h às 18h | Dom: Fechado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Salvar Configurações
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationManagement;

