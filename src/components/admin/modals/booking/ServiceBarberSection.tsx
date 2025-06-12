
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Service, Barber } from '@/data/types';

interface ServiceBarberSectionProps {
  services: Service[];
  barbers: Barber[];
  serviceId: string;
  barberId: string;
  onServiceChange: (value: string) => void;
  onBarberChange: (value: string) => void;
}

const ServiceBarberSection: React.FC<ServiceBarberSectionProps> = ({
  services,
  barbers,
  serviceId,
  barberId,
  onServiceChange,
  onBarberChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Serviço</label>
        <Select value={serviceId} onValueChange={onServiceChange}>
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
        <Select value={barberId} onValueChange={onBarberChange}>
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
    </div>
  );
};

export default ServiceBarberSection;
