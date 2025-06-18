
import { useState, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, subWeeks, subMonths } from 'date-fns';

export type DatePeriod = 'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month' | 'this_year' | 'custom';

export const useDateFilter = (initialPeriod: DatePeriod = 'this_month') => {
  const [period, setPeriod] = useState<DatePeriod>(initialPeriod);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const filteredDateRange = useMemo(() => {
    const now = new Date();
    
    switch (period) {
      case 'today':
        return {
          from: startOfDay(now),
          to: endOfDay(now)
        };
      case 'yesterday':
        const yesterday = subDays(now, 1);
        return {
          from: startOfDay(yesterday),
          to: endOfDay(yesterday)
        };
      case 'this_week':
        return {
          from: startOfWeek(now, { weekStartsOn: 1 }),
          to: endOfWeek(now, { weekStartsOn: 1 })
        };
      case 'last_week':
        const lastWeek = subWeeks(now, 1);
        return {
          from: startOfWeek(lastWeek, { weekStartsOn: 1 }),
          to: endOfWeek(lastWeek, { weekStartsOn: 1 })
        };
      case 'this_month':
        return {
          from: startOfMonth(now),
          to: endOfMonth(now)
        };
      case 'last_month':
        const lastMonth = subMonths(now, 1);
        return {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth)
        };
      case 'this_year':
        return {
          from: startOfYear(now),
          to: endOfYear(now)
        };
      case 'custom':
        return dateRange && dateRange.from && dateRange.to
          ? {
              from: startOfDay(dateRange.from),
              to: endOfDay(dateRange.to)
            }
          : { from: undefined, to: undefined };
      default:
        return {
          from: startOfMonth(now),
          to: endOfMonth(now)
        };
    }
  }, [period, dateRange]);

  return {
    period,
    setPeriod,
    dateRange,
    setDateRange,
    filteredDateRange
  };
};
