
import React from 'react';
import { cn } from '@/lib/utils';
import { Barber } from '@/data/mock';
import { BookingForm } from './types';

interface BarberSelectionProps {
  barbers: Barber[];
  form: BookingForm;
  onBarberSelect: (barberId: string) => void;
}

const BarberSelection: React.FC<BarberSelectionProps> = ({ barbers, form, onBarberSelect }) => {
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
            onClick={() => onBarberSelect(barber.id)}
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
};

export default BarberSelection;
