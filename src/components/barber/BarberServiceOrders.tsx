
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Square, Clock, DollarSign, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { ServiceOrder } from '@/data/types';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
              <ClipboardList className="h-5 w-5 text-blue-400" />
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
                <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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

interface ServiceOrderCardProps {
  order: ServiceOrder;
  timer: number;
  onStart: () => void;
  onStop: (paymentMethod: string) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  formatTime: (seconds: number) => string;
  index: number;
}

const ServiceOrderCard: React.FC<ServiceOrderCardProps> = ({
  order,
  timer,
  onStart,
  onStop,
  getStatusBadge,
  formatTime,
  index
}) => {
  const [selectedPayment, setSelectedPayment] = useState('');

  return (
    <div 
      className="management-item p-6 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-lg font-semibold text-foreground">{order.serviceName}</h3>
            {getStatusBadge(order.status)}
            {order.status === 'in_progress' && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="font-mono text-sm">{formatTime(timer)}</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Cliente:</span>
              <span className="font-medium text-foreground">{order.clientName}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Horário:</span>
              <span className="font-medium text-foreground">{order.scheduledTime}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Valor:</span>
              <span className="font-medium text-primary">R$ {order.amount}</span>
            </div>
          </div>

          {order.status === 'completed' && (
            <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
              Concluído em {order.endTime} • Duração: {order.actualDuration}min • Pagamento: {order.paymentMethod}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {order.status === 'waiting' && (
            <Button
              onClick={onStart}
              className="gradient-glow hover:scale-105 transition-all duration-300"
            >
              <Play className="w-4 h-4 mr-2" />
              Iniciar
            </Button>
          )}

          {order.status === 'in_progress' && (
            <div className="flex items-center space-x-3">
              <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="credit">Cartão</SelectItem>
                  <SelectItem value="cash">Dinheiro</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                onClick={() => onStop(selectedPayment)}
                variant="outline"
                className="hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 transition-all duration-300"
              >
                <Square className="w-4 h-4 mr-2" />
                Finalizar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarberServiceOrders;
