
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useMockData } from '@/contexts/MockDataContext';
import { useToast } from '@/hooks/use-toast';
import { Service } from '@/data/types';
import * as z from 'zod';

const serviceSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  duration: z.number().min(1, 'Duração deve ser maior que 0'),
  price: z.number().min(0, 'Preço deve ser maior ou igual a 0'),
  isActive: z.boolean()
});

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: Service;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  const { services, setServices } = useMockData();
  const { toast } = useToast();
  const isEdit = !!service;

  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: service || {
      title: '',
      description: '',
      duration: 30,
      price: 0,
      isActive: true
    }
  });

  const onSubmit = (data: any) => {
    if (isEdit) {
      setServices(prev => prev.map(s => s.id === service.id ? { 
        ...data, 
        id: service.id,
        imageUrl: service.imageUrl // Manter imageUrl existente
      } : s));
      toast({
        title: "Serviço atualizado",
        description: "O serviço foi atualizado com sucesso."
      });
    } else {
      const newService = {
        ...data,
        id: Date.now().toString(),
        imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400' // Imagem padrão
      };
      setServices(prev => [...prev, newService]);
      toast({
        title: "Serviço criado",
        description: "O novo serviço foi criado com sucesso."
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Editar Serviço' : 'Novo Serviço'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração (min)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Ativo</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEdit ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
