
import React from 'react';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import ClientAutocomplete from '@/components/ClientAutocomplete';

interface ClientDataSectionProps {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  onClientNameChange: (value: string) => void;
  onClientEmailChange: (value: string) => void;
  onClientPhoneChange: (value: string) => void;
  onClientSelect: (clientData: { name: string; email: string; phone: string }) => void;
}

const ClientDataSection: React.FC<ClientDataSectionProps> = ({
  clientName,
  clientEmail,
  clientPhone,
  onClientNameChange,
  onClientEmailChange,
  onClientPhoneChange,
  onClientSelect
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Nome do Cliente</label>
        <ClientAutocomplete
          value={clientName}
          onClientSelect={onClientSelect}
          onValueChange={onClientNameChange}
          className="rounded-xl bg-zinc-900 text-white border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Telefone</label>
        <PhoneInput
          value={clientPhone}
          onChange={onClientPhoneChange}
          className="rounded-xl bg-zinc-900 text-white border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          showActions={false}
          autoFormat={true}
        />
      </div>

      <div className="md:col-span-2 space-y-2">
        <label className="text-sm font-medium text-white">Email</label>
        <Input
          type="email"
          value={clientEmail}
          onChange={(e) => onClientEmailChange(e.target.value)}
          placeholder="email@exemplo.com"
          className="rounded-xl bg-zinc-900 text-white border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>
    </div>
  );
};

export default ClientDataSection;
