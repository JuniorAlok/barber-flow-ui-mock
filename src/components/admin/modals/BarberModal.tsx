
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useMockData } from '@/contexts/MockDataContext';
import { useToast } from '@/hooks/use-toast';
import { barberSchema } from '@/utils/validation';
import { Barber } from '@/data/types';

interface BarberModalProps {
  isOpen: boolean;
  onClose: () => void;
  barber?: Barber;
}

const BarberModal: React.FC<BarberModalProps> = ({ isOpen, onClose, barber }) => {
  const { barbers, setBarbers } = useMockData();
  const { toast } = useToast();
  const isEdit = !!barber;

  const form = useForm({
    resolver: zodResolver(barberSchema),
    defaultValues: barber || {
      id: '',
      name: '',
      specialization: '',
      avatarUrl: '',
      experience: '',
      rating: 5,
      isActive: true,
      phone: '',
      email: '',
      commission: 60
    }
  });

  const onSubmit = (data: any) => {
    if (isEdit) {
      setBarbers(prev => prev.map(b => b.id === barber.id ? { ...data, id: barber.id } : b));
      toast({
        title: "Barbeiro atualizado",
        description: "O barbeiro foi atualizado com sucesso."
      });
    } else {
      const newBarber = {
        ...data,
        id: Date.now().toString()
      };
      setBarbers(prev => [...prev, newBarber]);
      toast({
        title: "Barbeiro criado",
        description: "O novo barbeiro foi criado com sucesso."
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto bg-zinc-900 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{isEdit ? 'Editar Barbeiro' : 'Novo Barbeiro'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialização</FormLabel>
                  <FormControl>
                    <Input {...field} className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experiência</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: 5 anos de experiência" className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"/>
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
                      <Input type="email" {...field} className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Avatar</FormLabel>
                  <FormControl>
                    <Input {...field} className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avaliação (0-5)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="5" step="0.1" {...field} onChange={(e) => field.onChange(Number(e.target.value))} className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comissão (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} onChange={(e) => field.onChange(Number(e.target.value))} className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"/>
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
                <FormItem className="flex items-center space-x-2 pt-2">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-yellow-500"/>
                  </FormControl>
                  <FormLabel className="!mt-0">Ativo</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-medium transition-all duration-300">
                {isEdit ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BarberModal;
