
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useMockData } from '@/contexts/MockDataContext';
import { Service } from '@/data/types';
import { toast } from '@/hooks/use-toast';

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: Service | null;
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({ isOpen, onClose, service }) => {
  const { setServices } = useMockData();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 30,
    price: 0,
    isActive: true
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        description: service.description || '',
        duration: service.duration || 30,
        price: service.price || 0,
        isActive: service.isActive ?? true
      });
    } else {
      setFormData({
        title: '',
        description: '',
        duration: 30,
        price: 0,
        isActive: true
      });
    }
  }, [service, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Erro",
        description: "Título é obrigatório",
        variant: "destructive"
      });
      return;
    }

    const serviceData: Service = {
      id: service?.id || Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      duration: Math.max(1, Number(formData.duration)),
      price: Math.max(0, Number(formData.price)),
      isActive: formData.isActive,
      imageUrl: service?.imageUrl
    };

    if (service) {
      setServices(prev => prev.map(s => s.id === service.id ? serviceData : s));
      toast({
        title: "Serviço atualizado",
        description: "As informações foram salvas com sucesso."
      });
    } else {
      setServices(prev => [...prev, serviceData]);
      toast({
        title: "Serviço adicionado",
        description: "Novo serviço cadastrado com sucesso."
      });
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-zinc-900 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {service ? 'Editar Serviço' : 'Cadastrar Novo Serviço'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Título *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Corte Clássico"
              required
              className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Descrição</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição do serviço..."
              rows={3}
              className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Duração (min)</Label>
              <Input
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Preço (R$)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
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
              {service ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormModal;
