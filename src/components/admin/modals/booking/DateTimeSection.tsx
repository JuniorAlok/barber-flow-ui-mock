
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { timeSlots } from '@/data/constants';
import { cn } from '@/lib/utils';

interface DateTimeSectionProps {
  selectedDate: Date | undefined;
  time: string;
  onDateSelect: (date: Date | undefined) => void;
  onTimeChange: (value: string) => void;
}

const DateTimeSection: React.FC<DateTimeSectionProps> = ({
  selectedDate,
  time,
  onDateSelect,
  onTimeChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Data</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "w-full justify-start text-left font-normal rounded-xl bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500",
                !selectedDate && "text-zinc-400"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP', { locale: ptBR }) : 'Selecione uma data'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-700">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              initialFocus
              className="pointer-events-auto bg-zinc-900 text-white"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Horário</label>
        <Select value={time} onValueChange={onTimeChange}>
          <SelectTrigger className="w-full rounded-xl bg-zinc-900 text-white border-zinc-700 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
            <SelectValue placeholder="Selecione um horário" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {timeSlots.map(timeSlot => (
              <SelectItem key={timeSlot} value={timeSlot} className="text-white hover:bg-zinc-800">
                {timeSlot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DateTimeSection;
