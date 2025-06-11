
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clipboard } from 'lucide-react';
import { useServiceTimers } from '@/hooks/useServiceTimers';
import { useServiceOrders } from '@/hooks/useServiceOrders';
import ServiceOrderCard from './ServiceOrderCard';
import StatusBadge from './StatusBadge';

const BarberServiceOrders: React.FC = () => {
  const { timers, startTimer, stopTimer, formatTime, restartActiveTimers } = useServiceTimers();
  const { barberOrders, serviceOrders, handleStartService, handleStopService } = useServiceOrders();

  // Restart active timers on component mount
  useEffect(() => {
    if (serviceOrders.length > 0) {
      restartActiveTimers(serviceOrders);
    }
  }, [serviceOrders, restartActiveTimers]);

  const onStartService = (orderId: string) => {
    handleStartService(orderId);
    startTimer(orderId);
  };

  const onStopService = (orderId: string, paymentMethod: string) => {
    const actualDuration = Math.floor((timers[orderId] || 0) / 60);
    handleStopService(orderId, paymentMethod, actualDuration);
    stopTimer(orderId);
  };

  const getStatusBadge = (status: string) => {
    return <StatusBadge status={status} />;
  };

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
                <ServiceOrderCard
                  key={order.id}
                  order={order}
                  timer={timers[order.id] || 0}
                  onStart={() => onStartService(order.id)}
                  onStop={(paymentMethod) => onStopService(order.id, paymentMethod)}
                  getStatusBadge={getStatusBadge}
                  formatTime={formatTime}
                  index={index}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarberServiceOrders;
