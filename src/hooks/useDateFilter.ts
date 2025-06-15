
import { useState, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, subMonths } from 'date-fns';

export type Period = 'today' | 'this_week' | 'this_month' | 'last_month' | 'custom';

export const useDateFilter = (defaultPeriod: Period = 'this_month') => {
  const getInitialRange = () => {
    const now = new Date();
    switch (defaultPeriod) {
      case 'today':
        return { from: startOfDay(now), to: endOfDay(now) };
      case 'this_week':
        return { from: startOfWeek(now, { weekStartsOn: 1 }), to: endOfWeek(now, { weekStartsOn: 1 }) };
      case 'last_month':
        const lastMonth = subMonths(now, 1);
        return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
      case 'this_month':
      default:
        return { from: startOfMonth(now), to: endOfMonth(now) };
    }
  };

  const [period, setPeriod] = useState<Period>(defaultPeriod);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(getInitialRange());

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
    if (newPeriod === 'custom') {
      return;
    }
    const now = new Date();
    let from: Date | undefined;
    let to: Date | undefined;

    switch (newPeriod) {
      case 'today':
        from = startOfDay(now);
        to = endOfDay(now);
        break;
      case 'this_week':
        from = startOfWeek(now, { weekStartsOn: 1 });
        to = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case 'this_month':
        from = startOfMonth(now);
        to = endOfMonth(now);
        break;
      case 'last_month':
        const lastMonth = subMonths(now, 1);
        from = startOfMonth(lastMonth);
        to = endOfMonth(lastMonth);
        break;
    }
    setDateRange({ from, to });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setPeriod('custom');
  }
  
  const filteredDateRange = useMemo(() => {
    if (!dateRange?.from) return { from: undefined, to: undefined };
    const from = startOfDay(dateRange.from);
    const to = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from);
    return { from, to };
  }, [dateRange]);

  return {
    period,
    dateRange,
    filteredDateRange,
    setPeriod: handlePeriodChange,
    setDateRange: handleDateRangeChange,
  };
};
