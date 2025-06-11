
import React from 'react';
import { Button } from '@/components/ui/button';
import { timeSlots } from '@/data/mock';
import { BookingForm } from './types';

interface TimeSelectionProps {
  form: BookingForm;
  onTimeSelect: (time: string) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({ form, onTimeSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Escolha o horário</h3>
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((time) => (
          <Button
            key={time}
            variant={form.time === time ? "default" : "outline"}
            onClick={() => onTimeSelect(time)}
            className="w-full"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection;
