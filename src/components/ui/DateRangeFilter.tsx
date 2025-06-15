
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Period } from '@/hooks/useDateFilter';

interface DateRangeFilterProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  className?: string;
}

const periodOptions: { label: string; value: Period }[] = [
  { label: 'Hoje', value: 'today' },
  { label: 'Esta Semana', value: 'this_week' },
  { label: 'Este Mês', value: 'this_month' },
  { label: 'Mês Passado', value: 'last_month' },
];

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  period,
  onPeriodChange,
  dateRange,
  onDateRangeChange,
  className,
}) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {periodOptions.map((option) => (
        <Button
          key={option.value}
          variant={period === option.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPeriodChange(option.value)}
          className={cn('focus-ring', period === option.value && 'btn-luxury')}
        >
          {option.label}
        </Button>
      ))}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={period === 'custom' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPeriodChange('custom')}
            className={cn(
              'w-[260px] justify-start text-left font-normal focus-ring',
              !dateRange && 'text-muted-foreground',
              period === 'custom' && 'btn-luxury'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'dd/MM/yy', { locale: ptBR })} -{' '}
                  {format(dateRange.to, 'dd/MM/yy', { locale: ptBR })}
                </>
              ) : (
                format(dateRange.from, 'dd/MM/yy', { locale: ptBR })
              )
            ) : (
              <span>Personalizado</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
