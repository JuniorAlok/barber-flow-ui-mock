
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookingForm } from './types';

interface ClientDataFormProps {
  form: BookingForm;
  onFormChange: (updates: Partial<BookingForm>) => void;
}

const ClientDataForm: React.FC<ClientDataFormProps> = ({ form, onFormChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Seus dados</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome completo *</Label>
          <Input
            id="name"
            value={form.clientName}
            onChange={(e) => onFormChange({ clientName: e.target.value })}
            placeholder="Digite seu nome completo"
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={form.clientEmail}
            onChange={(e) => onFormChange({ clientEmail: e.target.value })}
            placeholder="Digite seu e-mail"
          />
        </div>
        <div>
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            value={form.clientPhone}
            onChange={(e) => onFormChange({ clientPhone: e.target.value })}
            placeholder="(11) 99999-9999"
          />
        </div>
        <div>
          <Label htmlFor="notes">Observações (opcional)</Label>
          <Input
            id="notes"
            value={form.notes}
            onChange={(e) => onFormChange({ notes: e.target.value })}
            placeholder="Alguma observação especial?"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDataForm;
