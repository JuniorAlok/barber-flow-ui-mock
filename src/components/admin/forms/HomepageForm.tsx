
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PhoneInput } from '@/components/ui/phone-input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';
import { HomeContentForm } from '@/utils/validation';

interface HomepageFormProps {
  form: UseFormReturn<HomeContentForm>;
  onSubmit: (data: HomeContentForm) => void;
}

const HomepageForm: React.FC<HomepageFormProps> = ({ form, onSubmit }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <h3 className="text-lg font-semibold">Seção Hero</h3>
            
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
              <h4 className="font-medium">Recursos do Hero</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="heroFeature1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recurso 1</FormLabel>
                      <FormControl>
                        <Input placeholder="Técnicas Clássicas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heroFeature2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recurso 2</FormLabel>
                      <FormControl>
                        <Input placeholder="Atendimento Premium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heroFeature3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recurso 3</FormLabel>
                      <FormControl>
                        <Input placeholder="Mestres Barbeiros" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
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

            <div className="space-y-4">
              <h4 className="font-medium">Recursos da Seção Sobre</h4>
              
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="aboutFeature1Title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Recurso 1</FormLabel>
                        <FormControl>
                          <Input placeholder="Tradição e Qualidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aboutFeature1Description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição do Recurso 1</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descrição..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="aboutFeature2Title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Recurso 2</FormLabel>
                        <FormControl>
                          <Input placeholder="Excelência em Atendimento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aboutFeature2Description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição do Recurso 2</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descrição..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="aboutFeature3Title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Recurso 3</FormLabel>
                        <FormControl>
                          <Input placeholder="Compromisso com o Tempo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aboutFeature3Description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição do Recurso 3</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descrição..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <h3 className="text-lg font-semibold">Seção Serviços</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="servicesTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Seção Serviços</FormLabel>
                    <FormControl>
                      <Input placeholder="Experiências Premium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="servicesSubtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo da Seção Serviços</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Cada serviço é uma obra de arte..."
                        className="min-h-[60px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <h3 className="text-lg font-semibold">Seção Equipe</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="teamTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Seção Equipe</FormLabel>
                    <FormControl>
                      <Input placeholder="Mestres da Arte" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamSubtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo da Seção Equipe</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Conheça os profissionais que elevaram..."
                        className="min-h-[60px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <h3 className="text-lg font-semibold">Informações de Contato</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Seção Contato</FormLabel>
                    <FormControl>
                      <Input placeholder="Agende Sua Experiência" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactSubtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo da Seção Contato</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Reserve seu horário e descubra..."
                        className="min-h-[60px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <PhoneInput 
                        placeholder="(11) 99999-9999" 
                        value={field.value}
                        onChange={field.onChange}
                      />
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

            <FormField
              control={form.control}
              name="whatsappMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem Padrão do WhatsApp</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Olá! Gostaria de agendar um horário na Elite Studio Barber."
                      className="min-h-[60px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6 border-t">
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Configurações
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HomepageForm;
