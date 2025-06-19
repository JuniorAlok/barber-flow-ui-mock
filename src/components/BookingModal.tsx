
import React, { useState, memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useMockData } from '@/contexts/MockDataContext';
import { toast } from '@/hooks/use-toast';
import { BookingForm } from './booking/types';
import BookingProgress from './booking/BookingProgress';
import ServiceSelection from './booking/ServiceSelection';
import BarberSelection from './booking/BarberSelection';
import DateSelection from './booking/DateSelection';
import TimeSelection from './booking/TimeSelection';
import ClientDataForm from './booking/ClientDataForm';
import BookingConfirmation from './booking/BookingConfirmation';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { services, barbers, setBookings } = useMockData();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<BookingForm>({
    serviceId: '',
    barberId: '',
    date: undefined,
    time: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: ''
  });

  const totalSteps = 6;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setForm({
      serviceId: '',
      barberId: '',
      date: undefined,
      time: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      notes: ''
    });
    setCurrentStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFinish = () => {
    if (!form.date) return;

    const selectedService = services.find(s => s.id === form.serviceId);
    const totalAmount = selectedService ? selectedService.price : 0;

    const newBooking = {
      id: Date.now().toString(),
      userId: '2',
      serviceId: form.serviceId,
      barberId: form.barberId,
      date: format(form.date, 'yyyy-MM-dd'),
      time: form.time,
      status: 'pending' as const,
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      clientPhone: form.clientPhone,
      notes: form.notes,
      totalAmount: totalAmount
    };

    setBookings(prev => [...prev, newBooking]);
    
    toast({
      title: "Agendamento realizado!",
      description: "Seu agendamento foi registrado com sucesso. Entraremos em contato para confirmação.",
    });

    handleClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return form.serviceId !== '';
      case 2: return form.barberId !== '';
      case 3: return form.date !== undefined;
      case 4: return form.time !== '';
      case 5: return form.clientName && form.clientEmail && form.clientPhone;
      case 6: return true;
      default: return false;
    }
  };

  const selectedService = services.find(s => s.id === form.serviceId);
  const selectedBarber = barbers.find(b => b.id === form.barberId);

  const updateForm = (updates: Partial<BookingForm>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            services={services}
            form={form}
            onServiceSelect={(serviceId) => updateForm({ serviceId })}
          />
        );

      case 2:
        return (
          <BarberSelection
            barbers={barbers}
            form={form}
            onBarberSelect={(barberId) => updateForm({ barberId })}
          />
        );

      case 3:
        return (
          <DateSelection
            form={form}
            onDateSelect={(date) => updateForm({ date })}
          />
        );

      case 4:
        return (
          <TimeSelection
            form={form}
            onTimeSelect={(time) => updateForm({ time })}
          />
        );

      case 5:
        return (
          <ClientDataForm
            form={form}
            onFormChange={updateForm}
          />
        );

      case 6:
        return (
          <BookingConfirmation
            form={form}
            selectedService={selectedService}
            selectedBarber={selectedBarber}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto bg-zinc-900 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle>Agendamento</DialogTitle>
          <BookingProgress currentStep={currentStep} totalSteps={totalSteps} />
        </DialogHeader>

        <div className="py-4">
          {renderStepContent()}
        </div>

        <div className="flex justify-between pt-4 border-t border-zinc-700">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              variant="luxury"
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleFinish} variant="luxury">
              Finalizar Agendamento
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(BookingModal);
