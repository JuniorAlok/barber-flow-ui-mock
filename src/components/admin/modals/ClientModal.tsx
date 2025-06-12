
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useMockData } from '@/contexts/MockDataContext';
import { Client } from '@/data/types';
import { toast } from '@/hooks/use-toast';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: Client | null;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, client }) => {
  const { setClients } = useMockData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    birthday: '',
    notes: '',
    isVip: false
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        phone: client.phone || '',
        email: client.email || '',
        birthday: client.birthday || '',
        notes: client.notes || '',
        isVip: client.isVip || false
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        birthday: '',
        notes: '',
        isVip: false
      });
    }
  }, [client, isOpen]);

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

    const clientData: Client = {
      id: client?.id || Date.now().toString(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      birthday: formData.birthday,
      notes: formData.notes.trim(),
      isVip: formData.isVip,
      totalVisits: client?.totalVisits || 0,
      totalSpent: client?.totalSpent || 0,
      lastVisit: client?.lastVisit || new Date().toISOString().split('T')[0]
    };

    if (client) {
      setClients(prev => prev.map(c => c.id === client.id ? clientData : c));
      toast({
        title: "Cliente atualizado",
        description: "As informações foram salvas com sucesso."
      });
    } else {
      setClients(prev => [...prev, clientData]);
      toast({
        title: "Cliente adicionado",
        description: "Novo cliente cadastrado com sucesso."
      });
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-zinc-900 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {client ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Nome completo *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="João da Silva"
                required
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Telefone *</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(11) 99999-9999"
                required
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">E-mail</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@exemplo.com"
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Data de Nascimento</Label>
              <Input
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
                className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Observações</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Preferências, histórico..."
              rows={3}
              className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
            />
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.isVip}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVip: checked }))}
                className="data-[state=checked]:bg-yellow-500"
              />
              <Label className="text-sm font-medium text-white">Cliente VIP</Label>
            </div>
            
            <Button 
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-medium px-6 py-2 rounded-xl transition-all duration-300"
            >
              {client ? 'Salvar Alterações' : 'Adicionar Cliente'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientModal;
