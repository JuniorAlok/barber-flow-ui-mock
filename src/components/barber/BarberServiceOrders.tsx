
import React, { useEffect, useCallback, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clipboard } from 'lucide-react';
import { useServiceTimers } from '@/hooks/useServiceTimers';
import { useServiceOrders } from '@/hooks/useServiceOrders';
import CommandFlow from '@/components/ui/command-flow';

const BarberServiceOrders: React.FC = () => {
  console.log('BarberServiceOrders: Component rendering');
  
  const { timers, startTimer, stopTimer, formatTime, restartActiveTimers } = useServiceTimers();
  const { barberOrders, serviceOrders, handleStartService, handleStopService } = useServiceOrders();

  // Use useCallback to memoize the restart function
  const memoizedRestartActiveTimers = useCallback(restartActiveTimers, [restartActiveTimers]);

  // Restart active timers on component mount - FIXED: Proper dependency array
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

  console.log('BarberServiceOrders: Rendering with barberOrders:', barberOrders.length);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="management-card border-0">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5">
              <Clipboard className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-xl">Comandas do Dia</CardTitle>
              <p className="text-sm text-muted-foreground">Gerencie seus serviços e cronômetros</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {barberOrders.length === 0 ? (
              <div className="text-center py-12">
                <Clipboard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma comanda para hoje</p>
              </div>
            ) : (
              barberOrders.map((order, index) => (
                <CommandFlow
                  key={order.id}
                  orderId={order.id}
                  clientName={order.clientName}
                  serviceName={order.serviceName}
                  status={getStatus(order)}
                  timer={timers[order.id] || 0}
                  onStart={() => onStartService(order.id)}
                  onFinish={(paymentMethod) => onStopService(order.id, paymentMethod)}
                  className={`animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(BarberServiceOrders);
