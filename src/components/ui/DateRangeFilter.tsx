
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

export type DatePeriod = 'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month' | 'this_year' | 'custom';

interface DateRangeFilterProps {
  period: DatePeriod;
  onPeriodChange: (period: DatePeriod) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  className?: string;
}

const periodLabels: Record<DatePeriod, string> = {
  today: 'Hoje',
  yesterday: 'Ontem', 
  this_week: 'Esta Semana',
  last_week: 'Semana Passada',
  this_month: 'Este Mês',
  last_month: 'Mês Passado',
  this_year: 'Este Ano',
  custom: 'Personalizado'
};

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  period,
  onPeriodChange,
  dateRange,
  onDateRangeChange,
  className
}) => {
  const periodOptions: DatePeriod[] = [
    'today',
    'yesterday', 
    'this_week',
    'last_week',
    'this_month',
    'last_month',
    'this_year',
    'custom'
  ];

  const getDateRangeText = () => {
    if (period !== 'custom') {
      return periodLabels[period];
    }
    
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, 'dd/MM/yy', { locale: ptBR })} - ${format(dateRange.to, 'dd/MM/yy', { locale: ptBR })}`;
    }
    
    if (dateRange?.from) {
      return format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR });
    }
    
    return 'Selecionar período';
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {/* Period Quick Buttons */}
      <div className="flex flex-wrap gap-2">
        {periodOptions.slice(0, -1).map((periodOption) => (
          <Button
            key={periodOption}
            variant={period === periodOption ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPeriodChange(periodOption)}
            className={cn(
              'rounded-xl transition-all duration-200',
              period === periodOption && 'shadow-md'
            )}
          >
            {periodLabels[periodOption]}
          </Button>
        ))}
      </div>

      {/* Custom Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={period === 'custom' ? 'default' : 'outline'}
            size="sm"
            className={cn(
              'rounded-xl transition-all duration-200 min-w-[200px] justify-between',
              period === 'custom' && 'shadow-md'
            )}
          >
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span className="truncate">{getDateRangeText()}</span>
            </div>
            <ChevronDown className="w-4 h-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-popover border-border/50" 
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => {
              onDateRangeChange(range);
              if (range?.from || range?.to) {
                onPeriodChange('custom');
              }
            }}
            numberOfMonths={2}
            className="rounded-xl border-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
