import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, Calendar, Target, Percent } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import DashboardCharts from './admin/DashboardCharts';
import { StatisticsGrid, StatisticCardProps } from '@/components/cards/StatisticCard';
import { SectionTitle, Title, Body, Subtitle, Caption } from '@/components/ui/typography';
import { formatCurrency } from '@/utils/formatting';
import { useDateFilter } from '@/hooks/useDateFilter';
import DateRangeFilter from '@/components/ui/DateRangeFilter';
import { isWithinInterval } from 'date-fns';

const DashboardMetrics: React.FC = () => {
  const { bookings, services, barbers } = useMockData();
  const { period, dateRange, setPeriod, setDateRange, filteredDateRange } = useDateFilter('this_month');

  const filteredBookings = useMemo(() => {
    if (!filteredDateRange.from || !filteredDateRange.to) return [];
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return isWithinInterval(bookingDate, { start: filteredDateRange.from!, end: filteredDateRange.to! });
    });
  }, [bookings, filteredDateRange]);

  const dashboardMetrics = useMemo(() => {
      const revenue = filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0);
      const totalBookings = filteredBookings.length;
      const uniqueClientIds = new Set(filteredBookings.map(b => b.userId));
      const totalClients = uniqueClientIds.size;
      const averageTicket = totalBookings > 0 ? revenue / totalBookings : 0;
      
      const serviceCounts = filteredBookings.reduce((acc, booking) => {
        acc[booking.serviceId] = (acc[booking.serviceId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topServiceId = Object.keys(serviceCounts).sort((a, b) => serviceCounts[b] - serviceCounts[a])[0];
      const topService = services.find(s => s.id === topServiceId)?.title || 'N/A';
      
      const barberRevenue = filteredBookings.reduce((acc, booking) => {
          acc[booking.barberId] = (acc[booking.barberId] || 0) + booking.totalAmount;
          return acc;
      }, {} as Record<string, number>);

      const topBarberId = Object.keys(barberRevenue).sort((a,b) => barberRevenue[b] - barberRevenue[a])[0];
      const topBarber = barbers.find(b => b.id === topBarberId)?.name || 'N/A';

      const monthlyProfit = revenue * 0.55; // Estimativa de lucro

      return {
          monthlyRevenue: revenue,
          monthlyBookings: totalBookings,
          monthlyClients: totalClients,
          averageTicket,
          topService,
          topBarber,
          monthlyProfit,
      }
  }, [filteredBookings, services, barbers]);


  const metricStats: StatisticCardProps[] = [
    {
      title: 'Receita no Período',
      value: formatCurrency(dashboardMetrics.monthlyRevenue),
      icon: DollarSign,
      trend: {
        value: 0,
        direction: 'up',
        label: 'comparativo indisponível',
      },
    },
    {
      title: 'Lucro Líquido (Est.)',
      value: formatCurrency(dashboardMetrics.monthlyProfit),
      icon: TrendingUp,
      trend: {
        value: 0,
        direction: 'up',
        label: 'comparativo indisponível',
      },
      variant: 'success',
    },
    {
      title: 'Agendamentos no Período',
      value: dashboardMetrics.monthlyBookings,
      icon: Calendar,
      trend: {
        value: 0,
        direction: 'up',
        label: 'comparativo indisponível',
      },
    },
    {
      title: 'Ticket Médio',
      value: formatCurrency(dashboardMetrics.averageTicket),
      icon: Target,
      trend: {
        value: 0,
        direction: 'up',
        label: 'comparativo indisponível',
      },
    },
    {
      title: 'Clientes Únicos',
      value: dashboardMetrics.monthlyClients,
      icon: Users,
      trend: {
        value: 0,
        direction: 'up',
        label: 'no período',
      },
    },
    {
      title: 'Taxa de Retenção',
      value: `N/A`,
      icon: Percent,
      trend: {
        value: 0,
        direction: 'up',
        label: 'cálculo indisponível',
      },
      variant: 'warning',
    },
  ];

  const highlights = [
    {
      label: 'Serviço Destaque',
      value: dashboardMetrics.topService,
      icon: '🏆',
      description: 'Mais agendado no período',
    },
    {
      label: 'Barbeiro Destaque',
      value: dashboardMetrics.topBarber,
      icon: '⭐',
      description: 'Maior faturamento no período',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
       <Card className="management-card">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <SectionTitle as="div" className="!mb-0">Filtrar Período</SectionTitle>
            <DateRangeFilter
              period={period}
              onPeriodChange={setPeriod}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </CardHeader>
      </Card>

      <div className="rounded-2xl border p-8 bg-card/50">
        <div>
          <Title className="!text-3xl mb-2">Dashboard Executivo</Title>
          <Body className="!text-lg">Métricas chave para decisões estratégicas.</Body>
        </div>
      </div>

      <StatisticsGrid stats={metricStats} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />

      <div className="space-y-4">
        <SectionTitle>Destaques do Período</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((highlight) => (
            <Card key={highlight.label} className="border hover:border-primary/50 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="text-4xl">
                    {highlight.icon}
                  </div>
                  <div className="flex-1">
                    <Caption as="p" className="mb-1">
                      {highlight.label}
                    </Caption>
                    <Subtitle as="p" className="!text-xl font-bold mb-1 !leading-none">
                      {highlight.value}
                    </Subtitle>
                    <Caption as="p" className="!text-xs !font-normal">
                      {highlight.description}
                    </Caption>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <SectionTitle>Análises Detalhadas</SectionTitle>
        <DashboardCharts bookings={filteredBookings} />
      </div>
    </div>
  );
};

export default DashboardMetrics;
