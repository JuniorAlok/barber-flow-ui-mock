
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Users, BarChart3, Target, Award } from 'lucide-react';
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
      color: 'text-primary',
      bgGradient: 'from-primary/20 to-primary/5'
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${dashboardMetrics.monthlyRevenue.toLocaleString()}`,
      growth: dashboardMetrics.revenueGrowth,
      icon: TrendingUp,
      color: 'text-green-400',
      bgGradient: 'from-green-500/20 to-green-500/5'
    },
    {
      title: 'Agendamentos',
      value: dashboardMetrics.totalBookings.toString(),
      growth: dashboardMetrics.bookingGrowth,
      icon: Calendar,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-blue-500/5'
    },
    {
      title: 'Agend. Mensais',
      value: dashboardMetrics.monthlyBookings.toString(),
      growth: dashboardMetrics.bookingGrowth,
      icon: Target,
      color: 'text-purple-400',
      bgGradient: 'from-purple-500/20 to-purple-500/5'
    },
    {
      title: 'Total Clientes',
      value: dashboardMetrics.totalClients.toString(),
      growth: 12.3,
      icon: Users,
      color: 'text-orange-400',
      bgGradient: 'from-orange-500/20 to-orange-500/5'
    },
    {
      title: 'Ticket Médio',
      value: `R$ ${dashboardMetrics.averageTicket}`,
      growth: 5.7,
      icon: BarChart3,
      color: 'text-cyan-400',
      bgGradient: 'from-cyan-500/20 to-cyan-500/5'
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
    <div className="space-y-8 animate-fade-in">
      {/* Header com efeito gradiente */}
      <div className="relative overflow-hidden rounded-2xl glass-effect-strong p-8 gradient-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Dashboard Executivo</h1>
          <p className="text-muted-foreground text-lg">Visão geral dos principais indicadores</p>
        </div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl floating-element"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/20 rounded-full blur-2xl floating-element"></div>
      </div>

      {/* Métricas principais com animações escalonadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => (
          <Card 
            key={metric.title} 
            className="metric-card animate-scale-in border-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.bgGradient}`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2 text-foreground">
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

      {/* Destaques com efeitos visuais aprimorados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight, index) => (
          <Card key={highlight.label} className="management-card animate-slide-up border-0" style={{ animationDelay: `${(index + 6) * 100}ms` }}>
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <div className="text-4xl floating-element" style={{ animationDelay: `${index * 500}ms` }}>
                  {highlight.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {highlight.label}
                  </p>
                  <p className="text-xl font-bold text-primary mb-1">
                    {highlight.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    <Award className="w-3 h-3 mr-1" />
                    Top
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos com container aprimorado */}
      <div className="animate-slide-up" style={{ animationDelay: '800ms' }}>
        <DashboardCharts />
      </div>
    </div>
  );
};

export default DashboardMetrics;
