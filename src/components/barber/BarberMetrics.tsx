
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ModernCard from '@/components/ui/modern-card';
import MetricCard from '@/components/ui/metric-card';
import { DollarSign, Clock, Users, Target, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const BarberMetrics: React.FC = () => {
  const { user } = useAuth();
  const { transactions, serviceOrders, bookings } = useMockData();

  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  // Calculate barber metrics
  const barberTransactions = transactions.filter(t => t.barberId === user?.id);
  const barberOrders = serviceOrders.filter(o => o.barberId === user?.id);
  const barberBookings = bookings.filter(b => b.barberId === user?.id);

  const monthlyRevenue = barberTransactions
    .filter(t => t.type === 'income' && isWithinInterval(new Date(t.date), { start: monthStart, end: monthEnd }))
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRevenue = barberTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const completedOrders = barberOrders.filter(o => o.status === 'completed');
  const monthlyOrders = completedOrders.filter(o => 
    isWithinInterval(new Date(o.date), { start: monthStart, end: monthEnd })
  );

  const totalWorkingHours = completedOrders.reduce((sum, order) => {
    return sum + (order.actualDuration || 0);
  }, 0);

  const averageServiceTime = completedOrders.length > 0 
    ? Math.round(totalWorkingHours / completedOrders.length) 
    : 0;

  const paymentMethodStats = completedOrders.reduce((acc, order) => {
    if (order.paymentMethod) {
      acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const metrics = [
    {
      title: 'Receita Mensal',
      value: `R$ ${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      status: 'positive' as const,
      trend: {
        value: 12.5,
        label: 'vs mês anterior',
        direction: 'up' as const
      }
    },
    {
      title: 'Receita Total',
      value: `R$ ${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      status: 'positive' as const,
      description: 'Todos os tempos'
    },
    {
      title: 'Serviços Concluídos',
      value: monthlyOrders.length.toString(),
      icon: Target,
      status: 'neutral' as const,
      trend: {
        value: 8.3,
        label: 'este mês',
        direction: 'up' as const
      }
    },
    {
      title: 'Tempo Médio',
      value: `${averageServiceTime}min`,
      icon: Clock,
      status: 'neutral' as const,
      description: 'Por serviço'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <ModernCard 
        title="Suas Métricas de Performance"
        subtitle={`Acompanhe seu desempenho em ${format(currentMonth, 'MMMM yyyy')}`}
        icon={<Calendar className="w-6 h-6 text-primary" />}
        variant="luxury"
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-4 mt-4">
          <Badge variant="outline" className="status-success">
            Performance Excelente
          </Badge>
          <Badge variant="outline" className="status-info">
            {monthlyOrders.length} serviços este mês
          </Badge>
        </div>
      </ModernCard>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            className="animate-scale-in hover-lift"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      {/* Payment Methods Analytics */}
      <ModernCard
        title="Análise de Formas de Pagamento"
        subtitle="Preferências dos seus clientes"
        icon={<Users className="w-5 w-5 text-orange-400" />}
        variant="glass"
        className="hover-lift"
      >
        {Object.keys(paymentMethodStats).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(paymentMethodStats).map(([method, count]) => {
              const methodData = {
                pix: { label: 'PIX', color: 'status-success' },
                credit: { label: 'Cartão', color: 'status-info' },
                cash: { label: 'Dinheiro', color: 'status-warning' }
              };
              
              const data = methodData[method as keyof typeof methodData];
              const percentage = Math.round((count / completedOrders.length) * 100);

              return (
                <div key={method} className="text-center p-4 rounded-xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20">
                  <Badge className={`mb-3 ${data?.color || 'status-info'}`}>
                    {data?.label || method}
                  </Badge>
                  <div className="text-3xl font-bold text-luxury mb-1">{count}</div>
                  <div className="text-sm text-muted-foreground">
                    {percentage}% dos serviços
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum serviço concluído ainda</p>
            <p className="text-sm text-muted-foreground mt-2">
              Complete alguns serviços para ver as estatísticas
            </p>
          </div>
        )}
      </ModernCard>

      {/* Activity Summary */}
      <ModernCard
        title="Resumo da Atividade"
        subtitle="Visão geral do seu desempenho"
        icon={<Clock className="w-5 h-5 text-cyan-400" />}
        variant="gradient"
        className="hover-lift"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-card/30">
              <span className="text-muted-foreground font-medium">Total de serviços:</span>
              <span className="text-xl font-bold text-foreground">{completedOrders.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-card/30">
              <span className="text-muted-foreground font-medium">Horas trabalhadas:</span>
              <span className="text-xl font-bold text-foreground">
                {Math.round(totalWorkingHours / 60)}h {totalWorkingHours % 60}min
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-card/30">
              <span className="text-muted-foreground font-medium">Agendamentos totais:</span>
              <span className="text-xl font-bold text-foreground">{barberBookings.length}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-muted-foreground font-medium">Ticket médio:</span>
              <span className="text-xl font-bold text-primary">
                R$ {completedOrders.length > 0 ? Math.round(totalRevenue / completedOrders.length) : 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <span className="text-muted-foreground font-medium">Taxa de conclusão:</span>
              <span className="text-xl font-bold text-green-400">
                {barberBookings.length > 0 
                  ? Math.round((completedOrders.length / barberBookings.length) * 100) 
                  : 0
                }%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="text-muted-foreground font-medium">Eficiência média:</span>
              <span className="text-xl font-bold text-blue-400">
                {averageServiceTime > 0 ? Math.round(100 - (averageServiceTime - 30)) : 100}%
              </span>
            </div>
          </div>
        </div>
      </ModernCard>
    </div>
  );
};

export default BarberMetrics;
