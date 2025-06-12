
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useMockData } from '@/contexts/MockDataContext';
import { Transaction } from '@/data/types';
import { toast } from '@/hooks/use-toast';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, transaction }) => {
  const { setTransactions } = useMockData();
  const [formData, setFormData] = useState({
    type: 'income' as 'income' | 'expense',
    category: '',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash' as 'pix' | 'credit' | 'cash'
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type || 'income',
        category: transaction.category || '',
        amount: transaction.amount || 0,
        description: transaction.description || '',
        date: transaction.date || new Date().toISOString().split('T')[0],
        paymentMethod: transaction.paymentMethod || 'cash'
      });
    } else {
      setFormData({
        type: 'income',
        category: '',
        amount: 0,
        description: '',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'cash'
      });
    }
  }, [transaction, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.description.trim()) {
      toast({
        title: "Erro",
        description: "Categoria e descrição são obrigatórias",
        variant: "destructive"
      });
      return;
    }

    const transactionData: Transaction = {
      id: transaction?.id || Date.now().toString(),
      type: formData.type,
      category: formData.category,
      amount: Math.abs(Number(formData.amount)),
      description: formData.description.trim(),
      date: formData.date,
      paymentMethod: formData.paymentMethod
    };

    if (transaction) {
      setTransactions(prev => prev.map(t => t.id === transaction.id ? transactionData : t));
      toast({
        title: "Transação atualizada",
        description: "As informações foram salvas com sucesso."
      });
    } else {
      setTransactions(prev => [...prev, transactionData]);
      toast({
        title: "Transação adicionada",
        description: "Nova transação cadastrada com sucesso."
      });
    }

    onClose();
  };

  const typeOptions = [
    { value: 'income', label: 'Receita' },
    { value: 'expense', label: 'Despesa' }
  ];

  const categoryOptions = [
    'Serviços',
    'Produtos',
    'Equipamentos',
    'Marketing',
    'Aluguel',
    'Utilities',
    'Outros'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-zinc-900 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {transaction ? 'Editar Transação' : 'Adicionar Transação'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Tipo *</Label>
            <Select value={formData.type} onValueChange={(value: 'income' | 'expense') => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="rounded-xl bg-zinc-800 border-zinc-700 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-zinc-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Categoria *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="rounded-xl bg-zinc-800 border-zinc-700 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-zinc-700">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Valor (R$) *</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
              className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Descrição *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detalhamento da transação..."
              rows={3}
              className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Data</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-medium px-6 py-2 rounded-xl transition-all duration-300"
            >
              {transaction ? 'Salvar Alterações' : 'Adicionar Transação'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
