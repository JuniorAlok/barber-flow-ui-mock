
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Users, BarChart3 } from 'lucide-react';
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
      color: 'text-primary'
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${dashboardMetrics.monthlyRevenue.toLocaleString()}`,
      growth: dashboardMetrics.revenueGrowth,
      icon: TrendingUp,
      color: 'text-primary'
    },
    {
      title: 'Agendamentos',
      value: dashboardMetrics.totalBookings.toString(),
      growth: dashboardMetrics.bookingGrowth,
      icon: Calendar,
      color: 'text-accent'
    },
    {
      title: 'Agend. Mensais',
      value: dashboardMetrics.monthlyBookings.toString(),
      growth: dashboardMetrics.bookingGrowth,
      icon: Calendar,
      color: 'text-accent'
    },
    {
      title: 'Total Clientes',
      value: dashboardMetrics.totalClients.toString(),
      growth: 12.3,
      icon: Users,
      color: 'text-secondary-foreground'
    },
    {
      title: 'Ticket Médio',
      value: `R$ ${dashboardMetrics.averageTicket}`,
      growth: 5.7,
      icon: BarChart3,
      color: 'text-secondary-foreground'
    }
  ];

  const highlights = [
    {
      label: 'Serviço Top',
      value: dashboardMetrics.topService,
      icon: '🏆'
    },
    {
      label: 'Barbeiro Top',
      value: dashboardMetrics.topBarber,
      icon: '⭐'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => (
          <Card key={metric.title} className="glass-effect hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center mt-2">
                {metric.growth > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`text-xs ${metric.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.growth > 0 ? '+' : ''}{metric.growth}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Destaques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight, index) => (
          <Card key={highlight.label} className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{highlight.icon}</div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{highlight.label}</p>
                  <p className="text-lg font-bold text-primary">{highlight.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <DashboardCharts />
    </div>
  );
};

export default DashboardMetrics;
