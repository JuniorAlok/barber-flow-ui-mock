
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Service, Barber } from '@/data/mock';
import { BookingForm } from './types';

interface BookingConfirmationProps {
  form: BookingForm;
  selectedService: Service | undefined;
  selectedBarber: Barber | undefined;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ 
  form, 
  selectedService, 
  selectedBarber 
}) => {
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
};

export default BookingConfirmation;
