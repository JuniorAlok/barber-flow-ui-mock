
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useMockData } from '@/contexts/MockDataContext';
import { Barber } from '@/data/types';
import { toast } from '@/hooks/use-toast';

interface BarberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  barber?: Barber | null;
}

const BarberFormModal: React.FC<BarberFormModalProps> = ({ isOpen, onClose, barber }) => {
  const { setBarbers } = useMockData();
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    phone: '',
    email: '',
    avatarUrl: '',
    rating: 5,
    commission: 50,
    isActive: true,
    password: ''
  });

  useEffect(() => {
    if (barber) {
      setFormData({
        name: barber.name || '',
        specialization: barber.specialization || '',
        experience: barber.experience || '',
        phone: barber.phone || '',
        email: barber.email || '',
        avatarUrl: barber.avatarUrl || '',
        rating: barber.rating || 5,
        commission: barber.commission || 50,
        isActive: barber.isActive ?? true,
        password: barber.password || ''
      });
    } else {
      setFormData({
        name: '',
        specialization: '',
        experience: '',
        phone: '',
        email: '',
        avatarUrl: '',
        rating: 5,
        commission: 50,
        isActive: true,
        password: ''
      });
    }
  }, [barber, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive"
      });
      return;
    }

    const barberData: Barber = {
      id: barber?.id || Date.now().toString(),
      name: formData.name.trim(),
      specialization: formData.specialization.trim(),
      experience: formData.experience.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      avatarUrl: formData.avatarUrl.trim() || '/placeholder.svg',
      rating: Math.max(0, Math.min(5, Number(formData.rating))),
      commission: Math.max(0, Math.min(100, Number(formData.commission))),
      isActive: formData.isActive,
      password: formData.password
    };

    if (barber) {
      setBarbers(prev => prev.map(b => b.id === barber.id ? barberData : b));
      toast({
        title: "Barbeiro atualizado",
        description: "As informações foram salvas com sucesso."
      });
    } else {
      setBarbers(prev => [...prev, barberData]);
      toast({
        title: "Barbeiro adicionado",
        description: "Novo barbeiro cadastrado com sucesso."
      });
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-zinc-900 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {barber ? 'Editar Barbeiro' : 'Adicionar Barbeiro'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Nome *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Carlos Santos"
                required
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Especialização</Label>
              <Input
                value={formData.specialization}
                onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                placeholder="Cortes Clássicos"
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Experiência</Label>
              <Input
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="8 anos de experiência"
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Telefone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(11) 99999-9999"
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@barbearia.com"
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">URL do Avatar</Label>
              <Input
                value={formData.avatarUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, avatarUrl: e.target.value }))}
                placeholder="https://..."
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Avaliação (0-5)</Label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Comissão (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.commission}
                onChange={(e) => setFormData(prev => ({ ...prev, commission: Number(e.target.value) }))}
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                className="data-[state=checked]:bg-yellow-500"
              />
              <Label className="text-sm font-medium text-white">Ativo</Label>
            </div>
            
            <Button 
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-medium px-6 py-2 rounded-xl transition-all duration-300"
            >
              {barber ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BarberFormModal;
