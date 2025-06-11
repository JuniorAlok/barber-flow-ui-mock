
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Clock, Users, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const BarberMetrics: React.FC = () => {
  const { user } = useAuth();
  const { transactions, serviceOrders, bookings } = useMockData();

  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  // Calcular métricas do barbeiro
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
      color: 'text-primary',
      bgGradient: 'from-primary/20 to-primary/5',
      description: 'Este mês'
    },
    {
      title: 'Receita Total',
      value: `R$ ${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-green-400',
      bgGradient: 'from-green-500/20 to-green-500/5',
      description: 'Todos os tempos'
    },
    {
      title: 'Serviços Concluídos',
      value: monthlyOrders.length.toString(),
      icon: Target,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-blue-500/5',
      description: 'Este mês'
    },
    {
      title: 'Tempo Médio',
      value: `${averageServiceTime}min`,
      icon: Clock,
      color: 'text-purple-400',
      bgGradient: 'from-purple-500/20 to-purple-500/5',
      description: 'Por serviço'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="management-card border-0 gradient-border">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Suas Métricas</h2>
            <p className="text-muted-foreground">
              Acompanhe seu desempenho em {format(currentMonth, 'MMMM yyyy')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
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
              <div className="text-2xl font-bold mb-1 text-foreground">
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas de Pagamento */}
      <Card className="management-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-orange-400" />
            <span>Formas de Pagamento Preferidas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(paymentMethodStats).map(([method, count]) => {
              const labels = {
                pix: 'PIX',
                credit: 'Cartão',
                cash: 'Dinheiro'
              };
              
              const colors = {
                pix: 'bg-green-500/20 text-green-400 border-green-500/30',
                credit: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                cash: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
              };

              return (
                <div key={method} className="management-item p-4 text-center">
                  <Badge 
                    variant="outline" 
                    className={`mb-2 ${colors[method as keyof typeof colors]}`}
                  >
                    {labels[method as keyof typeof labels]}
                  </Badge>
                  <div className="text-2xl font-bold text-foreground">{count}</div>
                  <div className="text-sm text-muted-foreground">serviços</div>
                </div>
              );
            })}
          </div>
          
          {Object.keys(paymentMethodStats).length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum serviço concluído ainda</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumo da Atividade */}
      <Card className="management-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-cyan-400" />
            <span>Resumo da Atividade</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total de serviços:</span>
                <span className="font-medium text-foreground">{completedOrders.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horas trabalhadas:</span>
                <span className="font-medium text-foreground">{Math.round(totalWorkingHours / 60)}h {totalWorkingHours % 60}min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Agendamentos totais:</span>
                <span className="font-medium text-foreground">{barberBookings.length}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ticket médio:</span>
                <span className="font-medium text-primary">
                  R$ {completedOrders.length > 0 ? Math.round(totalRevenue / completedOrders.length) : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa de conclusão:</span>
                <span className="font-medium text-green-400">
                  {barberBookings.length > 0 
                    ? Math.round((completedOrders.length / barberBookings.length) * 100) 
                    : 0
                  }%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarberMetrics;
