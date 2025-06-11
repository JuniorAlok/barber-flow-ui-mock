
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { BookingForm } from './types';

interface DateSelectionProps {
  form: BookingForm;
  onDateSelect: (date: Date | undefined) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({ form, onDateSelect }) => {
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
            onSelect={onDateSelect}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelection;
