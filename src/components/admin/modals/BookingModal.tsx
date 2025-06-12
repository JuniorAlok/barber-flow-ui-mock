
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMockData } from '@/contexts/MockDataContext';
import { useToast } from '@/hooks/use-toast';
import { useClientAutoCreate } from '@/hooks/useClientAutoCreate';
import { Booking } from '@/data/types';
import ClientAutocomplete from '@/components/ClientAutocomplete';
import { timeSlots } from '@/data/constants';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: Booking;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, booking }) => {
  const { services, barbers, bookings, setBookings } = useMockData();
  const { toast } = useToast();
  const { createClientIfNotExists } = useClientAutoCreate();
  const isEdit = !!booking;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    booking ? new Date(booking.date) : undefined
  );
  
  const [formData, setFormData] = useState({
    serviceId: booking?.serviceId || '',
    barberId: booking?.barberId || '',
    time: booking?.time || '',
    status: booking?.status || 'pending' as const,
    clientName: booking?.clientName || '',
    clientEmail: booking?.clientEmail || '',
    clientPhone: booking?.clientPhone || '',
    notes: booking?.notes || ''
  });

  const handleClientSelect = (clientData: { name: string; email: string; phone: string }) => {
    setFormData(prev => ({
      ...prev,
      clientName: clientData.name,
      clientEmail: clientData.email,
      clientPhone: clientData.phone
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !formData.serviceId || !formData.barberId || !formData.time || 
        !formData.clientName || !formData.clientEmail || !formData.clientPhone) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const selectedService = services.find(s => s.id === formData.serviceId);
    const totalAmount = selectedService ? selectedService.price : 0;

    if (isEdit) {
      setBookings(prev => prev.map(b => 
        b.id === booking.id 
          ? {
              ...b,
              serviceId: formData.serviceId,
              barberId: formData.barberId,
              date: format(selectedDate, 'yyyy-MM-dd'),
              time: formData.time,
              status: formData.status,
              clientName: formData.clientName,
              clientEmail: formData.clientEmail,
              clientPhone: formData.clientPhone,
              notes: formData.notes,
              totalAmount
            }
          : b
      ));
      toast({
        title: "Agendamento atualizado",
        description: "O agendamento foi atualizado com sucesso."
      });
    } else {
      const newBooking: Booking = {
        id: Date.now().toString(),
        userId: '2',
        serviceId: formData.serviceId,
        barberId: formData.barberId,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: formData.time,
        status: formData.status,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        notes: formData.notes,
        totalAmount
      };
      
      setBookings(prev => [...prev, newBooking]);
      
      createClientIfNotExists({
        name: formData.clientName,
        email: formData.clientEmail,
        phone: formData.clientPhone
      });
      
      toast({
        title: "Agendamento criado",
        description: "O novo agendamento foi criado com sucesso."
      });
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 text-white border-zinc-800 rounded-2xl shadow-xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            {isEdit ? 'Editar Agendamento' : 'Novo Agendamento'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BLOCO 1: Seleção de Serviço e Horário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Serviço</label>
              <Select value={formData.serviceId} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceId: value }))}>
                <SelectTrigger className="w-full rounded-xl bg-zinc-900 text-white border-zinc-700 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  {services.filter(s => s.isActive).map(service => (
                    <SelectItem key={service.id} value={service.id} className="text-white hover:bg-zinc-800">
                      {service.title} - R$ {service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Barbeiro</label>
              <Select value={formData.barberId} onValueChange={(value) => setFormData(prev => ({ ...prev, barberId: value }))}>
                <SelectTrigger className="w-full rounded-xl bg-zinc-900 text-white border-zinc-700 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                  <SelectValue placeholder="Selecione um barbeiro" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  {barbers.filter(b => b.isActive).map(barber => (
                    <SelectItem key={barber.id} value={barber.id} className="text-white hover:bg-zinc-800">
                      {barber.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Data</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-xl bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500",
                      !selectedDate && "text-zinc-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP', { locale: ptBR }) : 'Selecione uma data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-700">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="pointer-events-auto bg-zinc-900 text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Horário</label>
              <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                <SelectTrigger className="w-full rounded-xl bg-zinc-900 text-white border-zinc-700 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                  <SelectValue placeholder="Selecione um horário" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time} className="text-white hover:bg-zinc-800">
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* BLOCO 2: Dados do Cliente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Nome do Cliente</label>
              <ClientAutocomplete
                value={formData.clientName}
                onClientSelect={handleClientSelect}
                onValueChange={(value) => setFormData(prev => ({ ...prev, clientName: value }))}
                className="rounded-xl bg-zinc-900 text-white border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Telefone</label>
              <Input
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                placeholder="(11) 99999-9999"
                className="rounded-xl bg-zinc-900 text-white border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <Input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                placeholder="email@exemplo.com"
                className="rounded-xl bg-zinc-900 text-white border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>

          {/* BLOCO 3: Status e Observações */}
          <div className="grid grid-cols-1 gap-4">
            {isEdit && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Status</label>
                <Select value={formData.status} onValueChange={(value: 'pending' | 'confirmed' | 'done' | 'cancelled') => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="w-full rounded-xl bg-zinc-900 text-white border-zinc-700 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="pending" className="text-white hover:bg-zinc-800">Pendente</SelectItem>
                    <SelectItem value="confirmed" className="text-white hover:bg-zinc-800">Confirmado</SelectItem>
                    <SelectItem value="done" className="text-white hover:bg-zinc-800">Concluído</SelectItem>
                    <SelectItem value="cancelled" className="text-white hover:bg-zinc-800">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Observações</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Observações adicionais..."
                rows={3}
                className="rounded-xl bg-zinc-900 text-white border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="px-4 py-2 rounded-xl border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-transparent transition-colors"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold shadow-md hover:scale-[1.03] transition-transform hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-300"
            >
              {isEdit ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
