
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
    status: booking?.status || 'pending',
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
              status: formData.status as any,
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
        status: formData.status as any,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        notes: formData.notes,
        totalAmount
      };
      
      setBookings(prev => [...prev, newBooking]);
      
      // Auto-create client if not exists
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
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Editar Agendamento' : 'Novo Agendamento'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Serviço</label>
              <Select value={formData.serviceId} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.filter(s => s.isActive).map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.title} - R$ {service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Barbeiro</label>
              <Select value={formData.barberId} onValueChange={(value) => setFormData(prev => ({ ...prev, barberId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um barbeiro" />
                </SelectTrigger>
                <SelectContent>
                  {barbers.filter(b => b.isActive).map(barber => (
                    <SelectItem key={barber.id} value={barber.id}>
                      {barber.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Data</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP', { locale: ptBR }) : 'Selecione uma data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium">Horário</label>
              <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ClientAutocomplete
            value={formData.clientName}
            onClientSelect={handleClientSelect}
            onValueChange={(value) => setFormData(prev => ({ ...prev, clientName: value }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Email do Cliente</label>
              <Input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                placeholder="email@exemplo.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Telefone do Cliente</label>
              <Input
                value={formData.clientPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          {isEdit && (
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="done">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Observações</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Observações adicionais..."
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEdit ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
