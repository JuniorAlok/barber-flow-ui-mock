
import React from 'react';
import { cn } from '@/lib/utils';
import { Service } from '@/data/mock';
import { BookingForm } from './types';

interface ServiceSelectionProps {
  services: Service[];
  form: BookingForm;
  onServiceSelect: (serviceId: string) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ services, form, onServiceSelect }) => {
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
            onClick={() => onServiceSelect(service.id)}
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
};

export default ServiceSelection;
