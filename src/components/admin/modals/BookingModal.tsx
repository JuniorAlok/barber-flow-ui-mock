
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useMockData } from '@/contexts/MockDataContext';
import { useToast } from '@/hooks/use-toast';
import { useClientAutoCreate } from '@/hooks/useClientAutoCreate';
import { Booking } from '@/data/types';
import ServiceBarberSection from './booking/ServiceBarberSection';
import DateTimeSection from './booking/DateTimeSection';
import ClientDataSection from './booking/ClientDataSection';
import StatusNotesSection from './booking/StatusNotesSection';

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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Editar Agendamento' : 'Novo Agendamento'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ServiceBarberSection
            services={services}
            barbers={barbers}
            serviceId={formData.serviceId}
            barberId={formData.barberId}
            onServiceChange={(value) => setFormData(prev => ({ ...prev, serviceId: value }))}
            onBarberChange={(value) => setFormData(prev => ({ ...prev, barberId: value }))}
          />

          <DateTimeSection
            selectedDate={selectedDate}
            time={formData.time}
            onDateSelect={setSelectedDate}
            onTimeChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
          />

          <ClientDataSection
            clientName={formData.clientName}
            clientEmail={formData.clientEmail}
            clientPhone={formData.clientPhone}
            onClientNameChange={(value) => setFormData(prev => ({ ...prev, clientName: value }))}
            onClientEmailChange={(value) => setFormData(prev => ({ ...prev, clientEmail: value }))}
            onClientPhoneChange={(value) => setFormData(prev => ({ ...prev, clientPhone: value }))}
            onClientSelect={handleClientSelect}
          />

          <StatusNotesSection
            status={formData.status}
            notes={formData.notes}
            showStatus={isEdit}
            onStatusChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            onNotesChange={(value) => setFormData(prev => ({ ...prev, notes: value }))}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
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
