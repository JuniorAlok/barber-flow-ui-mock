
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, Calendar, Target, Percent } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import DashboardCharts from './admin/DashboardCharts';
import { StatisticsGrid, StatisticCardProps } from '@/components/cards/StatisticCard';
import { SectionTitle } from '@/components/ui/typography';
import { formatCurrency } from '@/utils/formatting';

const DashboardMetrics: React.FC = () => {
  const { dashboardMetrics } = useMockData();

  // Métricas financeiras e de cliente para o dashboard.
  // Assumimos despesas e crescimento do lucro para fins de demonstração.
  const monthlyExpenses = dashboardMetrics.monthlyRevenue * 0.45;
  const monthlyProfit = dashboardMetrics.monthlyRevenue - monthlyExpenses;
  const profitGrowth = dashboardMetrics.revenueGrowth > 0 ? dashboardMetrics.revenueGrowth * 0.8 : -5;

  const clientGrowth = 12.3;
  const retentionRate = 67;
  const retentionGrowth = 2.5;

  const metricStats: StatisticCardProps[] = [
    {
      title: 'Receita Mensal',
      value: formatCurrency(dashboardMetrics.monthlyRevenue),
      icon: DollarSign,
      trend: {
        value: dashboardMetrics.revenueGrowth,
        direction: dashboardMetrics.revenueGrowth > 0 ? 'up' : 'down',
        label: 'mês anterior',
      },
    },
    {
      title: 'Lucro Líquido (Mês)',
      value: formatCurrency(monthlyProfit),
      icon: TrendingUp,
      trend: {
        value: parseFloat(profitGrowth.toFixed(1)),
        direction: profitGrowth > 0 ? 'up' : 'down',
        label: 'estimado',
      },
      variant: 'success',
    },
    {
      title: 'Agendamentos (Mês)',
      value: dashboardMetrics.monthlyBookings,
      icon: Calendar,
      trend: {
        value: dashboardMetrics.bookingGrowth,
        direction: dashboardMetrics.bookingGrowth > 0 ? 'up' : 'down',
        label: 'mês anterior',
      },
    },
    {
      title: 'Ticket Médio',
      value: formatCurrency(dashboardMetrics.averageTicket),
      icon: Target,
      trend: {
        value: 5.7,
        direction: 'up',
        label: 'mês anterior',
      },
    },
    {
      title: 'Novos Clientes (Mês)',
      value: dashboardMetrics.monthlyClients,
      icon: Users,
      trend: {
        value: clientGrowth,
        direction: 'up',
        label: 'conquistados',
      },
    },
    {
      title: 'Taxa de Retenção',
      value: `${retentionRate}%`,
      icon: Percent,
      trend: {
        value: retentionGrowth,
        direction: 'up',
        label: 'fidelizados',
      },
      variant: 'warning',
    },
  ];

  const highlights = [
    {
      label: 'Serviço Destaque',
      value: dashboardMetrics.topService,
      icon: '🏆',
      description: 'Mais agendado no mês',
    },
    {
      label: 'Barbeiro Destaque',
      value: dashboardMetrics.topBarber,
      icon: '⭐',
      description: 'Maior faturamento no mês',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="rounded-2xl border p-8 bg-card/50">
        <div>
          <h1 className="text-3xl font-bold font-display mb-2">Dashboard Executivo</h1>
          <p className="text-muted-foreground text-lg">Métricas chave para decisões estratégicas.</p>
        </div>
      </div>

      <StatisticsGrid stats={metricStats} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />

      <div className="space-y-4">
        <SectionTitle>Destaques do Mês</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((highlight) => (
            <Card key={highlight.label} className="border hover:border-primary/50 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="text-4xl">
                    {highlight.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {highlight.label}
                    </p>
                    <p className="text-xl font-bold mb-1">
                      {highlight.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <SectionTitle>Análises Detalhadas</SectionTitle>
        <DashboardCharts />
      </div>
    </div>
  );
};

export default DashboardMetrics;
