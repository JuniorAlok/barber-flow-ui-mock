
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clipboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import ServiceOrderCard from './ServiceOrderCard';

const BarberServiceOrders: React.FC = () => {
  const { user } = useAuth();
  const { serviceOrders, setServiceOrders, setTransactions } = useMockData();
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [activeTimers, setActiveTimers] = useState<{ [key: string]: NodeJS.Timeout }>({});

  const barberOrders = serviceOrders.filter(order => order.barberId === user?.id);

  // Load timers from localStorage on component mount
  useEffect(() => {
    const savedTimers = localStorage.getItem('barber-timers');
    if (savedTimers) {
      const parsedTimers = JSON.parse(savedTimers);
      setTimers(parsedTimers);
      
      // Restart active timers
      Object.entries(parsedTimers).forEach(([orderId, seconds]) => {
        const order = serviceOrders.find(o => o.id === orderId);
        if (order && order.status === 'in_progress') {
          startTimer(orderId, seconds as number);
        }
      });
    }
  }, []);

  // Save timers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('barber-timers', JSON.stringify(timers));
  }, [timers]);

  const startTimer = (orderId: string, initialSeconds = 0) => {
    if (activeTimers[orderId]) return;

    const interval = setInterval(() => {
      setTimers(prev => ({
        ...prev,
        [orderId]: (prev[orderId] || initialSeconds) + 1
      }));
    }, 1000);

    setActiveTimers(prev => ({
      ...prev,
      [orderId]: interval
    }));
  };

  const stopTimer = (orderId: string) => {
    if (activeTimers[orderId]) {
      clearInterval(activeTimers[orderId]);
      setActiveTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[orderId];
        return newTimers;
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartService = (orderId: string) => {
    const now = new Date();
    const currentTime = format(now, 'HH:mm');

    setServiceOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: 'in_progress', startTime: currentTime }
          : order
      )
    );

    startTimer(orderId);
    
    toast({
      title: "Serviço iniciado",
      description: "O cronômetro foi iniciado para este serviço.",
    });
  };

  const handleStopService = (orderId: string, paymentMethod: string) => {
    if (!paymentMethod) {
      toast({
        title: "Selecione a forma de pagamento",
        description: "É necessário informar como o cliente irá pagar.",
        variant: "destructive",
      });
      return;
    }

    const now = new Date();
    const currentTime = format(now, 'HH:mm');
    const actualDuration = Math.floor((timers[orderId] || 0) / 60);

    const order = serviceOrders.find(o => o.id === orderId);
    if (!order) return;

    // Update service order
    setServiceOrders(prev => 
      prev.map(o => 
        o.id === orderId 
          ? { 
              ...o, 
              status: 'completed', 
              endTime: currentTime,
              actualDuration,
              paymentMethod: paymentMethod as any
            }
          : o
      )
    );

    // Add transaction
    const newTransaction = {
      id: Date.now().toString(),
      type: 'income' as const,
      category: 'Serviços',
      amount: order.amount,
      description: `${order.serviceName} - ${order.clientName}`,
      date: format(now, 'yyyy-MM-dd'),
      serviceOrderId: orderId,
      barberId: user?.id,
      paymentMethod: paymentMethod as any
    };

    setTransactions(prev => [...prev, newTransaction]);

    stopTimer(orderId);
    
    toast({
      title: "Serviço concluído",
      description: `Serviço finalizado e pagamento em ${paymentMethod} registrado.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      waiting: { variant: "secondary" as const, label: "Aguardando", color: "text-yellow-400" },
      in_progress: { variant: "default" as const, label: "Em Andamento", color: "text-blue-400" },
      completed: { variant: "outline" as const, label: "Concluído", color: "text-green-400" },
      cancelled: { variant: "destructive" as const, label: "Cancelado", color: "text-red-400" }
    };
    
    const config = variants[status as keyof typeof variants] || variants.waiting;
    return <Badge variant={config.variant} className={config.color}>{config.label}</Badge>;
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
                  onStart={() => handleStartService(order.id)}
                  onStop={(paymentMethod) => handleStopService(order.id, paymentMethod)}
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
