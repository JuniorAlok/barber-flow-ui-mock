import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useMockData } from '@/contexts/MockDataContext';
import { timeSlots } from '@/data/mock';
import { toast } from '@/hooks/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingForm {
  serviceId: string;
  barberId: string;
  date: Date | undefined;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Escolha o serviço</h3>
            <div className="grid gap-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={cn(
                    "p-4 border rounded-lg cursor-pointer transition-colors",
                    form.serviceId === service.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setForm({ ...form, serviceId: service.id })}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">{service.duration} min</p>
                    </div>
                    <span className="font-bold text-primary">R$ {service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Escolha o barbeiro</h3>
            <div className="grid gap-3">
              {barbers.map((barber) => (
                <div
                  key={barber.id}
                  className={cn(
                    "p-4 border rounded-lg cursor-pointer transition-colors",
                    form.barberId === barber.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setForm({ ...form, barberId: barber.id })}
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={barber.avatarUrl} 
                      alt={barber.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{barber.name}</h4>
                      <p className="text-sm text-muted-foreground">{barber.specialization}</p>
                      <p className="text-sm text-muted-foreground">{barber.experience}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Escolha a data</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.date ? format(form.date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={form.date}
                  onSelect={(date) => setForm({ ...form, date })}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Escolha o horário</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={form.time === time ? "default" : "outline"}
                  onClick={() => setForm({ ...form, time })}
                  className="w-full"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Seus dados</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.clientEmail}
                  onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                  placeholder="Digite seu e-mail"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={form.clientPhone}
                  onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="notes">Observações (opcional)</Label>
                <Input
                  id="notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Alguma observação especial?"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Confirmação</h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div>
                <span className="font-medium">Serviço:</span> {selectedService?.title}
              </div>
              <div>
                <span className="font-medium">Barbeiro:</span> {selectedBarber?.name}
              </div>
              <div>
                <span className="font-medium">Data:</span> {form.date ? format(form.date, "PPP", { locale: ptBR }) : ''}
              </div>
              <div>
                <span className="font-medium">Horário:</span> {form.time}
              </div>
              <div>
                <span className="font-medium">Cliente:</span> {form.clientName}
              </div>
              <div>
                <span className="font-medium">Contato:</span> {form.clientEmail} | {form.clientPhone}
              </div>
              {form.notes && (
                <div>
                  <span className="font-medium">Observações:</span> {form.notes}
                </div>
              )}
              <div className="pt-2 border-t">
                <span className="font-bold text-lg">Total: R$ {selectedService?.price}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agendamento</DialogTitle>
          <div className="flex items-center space-x-2 mt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 flex-1 rounded-full",
                  i + 1 <= currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Passo {currentStep} de {totalSteps}
          </p>
        </DialogHeader>

        <div className="py-4">
          {renderStepContent()}
        </div>

        <div className="flex justify-between pt-4 border-t">
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
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleFinish}>
              Finalizar Agendamento
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
