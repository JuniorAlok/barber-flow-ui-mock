
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Square, Clock, DollarSign, User } from 'lucide-react';
import { ServiceOrder } from '@/data/types';

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

export default ServiceOrderCard;
