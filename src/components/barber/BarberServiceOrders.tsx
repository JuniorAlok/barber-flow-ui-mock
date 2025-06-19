
import React, { useEffect, useCallback, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ModernCard from '@/components/ui/modern-card';
import EnhancedLoading from '@/components/ui/enhanced-loading';
import StatusCard from '@/components/ui/status-card';
import { Clipboard, Activity, Timer } from 'lucide-react';
import { useServiceTimers } from '@/hooks/useServiceTimers';
import { useServiceOrders } from '@/hooks/useServiceOrders';
import CommandFlow from '@/components/ui/command-flow';

const BarberServiceOrders: React.FC = () => {
  console.log('BarberServiceOrders: Component rendering');
  
  const { timers, startTimer, stopTimer, formatTime, restartActiveTimers } = useServiceTimers();
  const { barberOrders, serviceOrders, handleStartService, handleStopService } = useServiceOrders();

  const memoizedRestartActiveTimers = useCallback(restartActiveTimers, [restartActiveTimers]);

  useEffect(() => {
    console.log('BarberServiceOrders: useEffect triggered with serviceOrders:', serviceOrders.length);
    if (serviceOrders.length > 0) {
      console.log('BarberServiceOrders: Restarting active timers');
      memoizedRestartActiveTimers(serviceOrders);
    }
  }, [serviceOrders.length, memoizedRestartActiveTimers]);

  const onStartService = (orderId: string) => {
    console.log('BarberServiceOrders: Starting service for order:', orderId);
    handleStartService(orderId);
    startTimer(orderId);
  };

  const onStopService = (orderId: string, paymentMethod: string) => {
    console.log('BarberServiceOrders: Stopping service for order:', orderId, 'payment:', paymentMethod);
    const actualDuration = Math.floor((timers[orderId] || 0) / 60);
    handleStopService(orderId, paymentMethod, actualDuration);
    stopTimer(orderId);
  };

  const getStatus = (order: any): 'waiting' | 'active' | 'completed' => {
    if (order.status === 'completed') return 'completed';
    if (order.status === 'in_progress') return 'active';
    return 'waiting';
  };

  const getOrderStats = () => {
    const waiting = barberOrders.filter(order => order.status === 'confirmed').length;
    const active = barberOrders.filter(order => order.status === 'in_progress').length;
    const completed = barberOrders.filter(order => order.status === 'completed').length;
    
    return { waiting, active, completed };
  };

  const stats = getOrderStats();

  console.log('BarberServiceOrders: Rendering with barberOrders:', barberOrders.length);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard
          status="pending"
          title={`${stats.waiting} Aguardando`}
          description="Comandas prontas para iniciar"
          icon={Timer}
          animated
        />
        <StatusCard
          status="warning"
          title={`${stats.active} Em Andamento`}
          description="Serviços sendo executados"
          icon={Activity}
          animated
        />
        <StatusCard
          status="success"
          title={`${stats.completed} Concluídas`}
          description="Serviços finalizados hoje"
          animated
        />
      </div>

      {/* Main Commands Card */}
      <ModernCard
        title="Comandas do Dia"
        subtitle="Gerencie seus serviços e cronômetros em tempo real"
        icon={<Clipboard className="w-6 h-6 text-blue-400" />}
        variant="luxury"
        hover
        glow
      >
        <div className="space-y-6">
          {barberOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/30 mb-6 animate-pulse">
                <Clipboard className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhuma comanda para hoje
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Quando houver novos agendamentos, eles aparecerão aqui para você gerenciar.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {barberOrders.map((order, index) => (
                <CommandFlow
                  key={order.id}
                  orderId={order.id}
                  clientName={order.clientName}
                  serviceName={order.serviceName}
                  status={getStatus(order)}
                  timer={timers[order.id] || 0}
                  onStart={() => onStartService(order.id)}
                  onFinish={(paymentMethod) => onStopService(order.id, paymentMethod)}
                  className="animate-slide-up hover-scale"
                  style={{ animationDelay: `${index * 150}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </ModernCard>

      {/* Quick Actions */}
      {stats.active > 0 && (
        <ModernCard
          title="Serviços Ativos"
          subtitle={`${stats.active} serviço${stats.active > 1 ? 's' : ''} em andamento`}
          variant="glass"
          className="border-2 border-green-500/20 bg-gradient-to-br from-green-500/5 to-green-500/2"
        >
          <div className="flex items-center justify-center space-x-4 py-4">
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="font-medium">Monitoramento Ativo</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Acompanhe o progresso em tempo real
            </div>
          </div>
        </ModernCard>
      )}
    </div>
  );
};

export default memo(BarberServiceOrders);
