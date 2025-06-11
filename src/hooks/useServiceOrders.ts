
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export const useServiceOrders = () => {
  const { user } = useAuth();
  const { serviceOrders, setServiceOrders, setTransactions } = useMockData();

  const barberOrders = serviceOrders.filter(order => order.barberId === user?.id);

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
    
    toast({
      title: "Serviço iniciado",
      description: "O cronômetro foi iniciado para este serviço.",
    });
  };

  const handleStopService = (orderId: string, paymentMethod: string, actualDuration: number) => {
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
    return config;
  };

  return {
    barberOrders,
    serviceOrders,
    handleStartService,
    handleStopService,
    getStatusBadge
  };
};
