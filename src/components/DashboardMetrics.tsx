import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Users, BarChart3, Target } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import DashboardCharts from './admin/DashboardCharts';

const DashboardMetrics: React.FC = () => {
  const { dashboardMetrics } = useMockData();

  const metricCards = [
    {
      title: 'Receita Total',
      value: `R$ ${dashboardMetrics.totalRevenue.toLocaleString()}`,
      growth: dashboardMetrics.revenueGrowth,
      icon: DollarSign,
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${dashboardMetrics.monthlyRevenue.toLocaleString()}`,
      growth: dashboardMetrics.revenueGrowth,
      icon: TrendingUp,
    },
    {
      title: 'Agendamentos',
      value: dashboardMetrics.totalBookings.toString(),
      growth: dashboardMetrics.bookingGrowth,
      icon: Calendar,
    },
    {
      title: 'Agend. Mensais',
      value: dashboardMetrics.monthlyBookings.toString(),
      growth: dashboardMetrics.bookingGrowth,
      icon: Target,
    },
    {
      title: 'Total Clientes',
      value: dashboardMetrics.totalClients.toString(),
      growth: 12.3,
      icon: Users,
    },
    {
      title: 'Ticket Médio',
      value: `R$ ${dashboardMetrics.averageTicket}`,
      growth: 5.7,
      icon: BarChart3,
    }
  ];

  const highlights = [
    {
      label: 'Serviço Top',
      value: dashboardMetrics.topService,
      icon: '🏆',
      description: 'Mais procurado'
    },
    {
      label: 'Barbeiro Top',
      value: dashboardMetrics.topBarber,
      icon: '⭐',
      description: 'Maior receita'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border p-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Executivo</h1>
          <p className="text-muted-foreground text-lg">Visão geral dos principais indicadores</p>
        </div>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {metric.value}
              </div>
              <div className="flex items-center">
                {metric.growth > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                )}
                <span className={`text-sm font-medium ${metric.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.growth > 0 ? '+' : ''}{metric.growth}%
                </span>
                <span className="text-xs text-muted-foreground ml-2">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight) => (
          <Card key={highlight.label} className="border">
            <CardContent>
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

      <div>
        <DashboardCharts />
      </div>
    </div>
  );
};

export default DashboardMetrics;
