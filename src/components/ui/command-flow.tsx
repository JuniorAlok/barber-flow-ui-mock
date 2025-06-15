
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Square, Clock, CreditCard } from 'lucide-react';
import StatusIndicator from './status-indicator';
import { cn } from '@/lib/utils';

interface CommandFlowProps {
  orderId: string;
  clientName: string;
  serviceName: string;
  onStart: () => void;
  onFinish: (paymentMethod: string) => void;
  status: 'waiting' | 'active' | 'completed';
  timer: number;
  className?: string;
  style?: React.CSSProperties;
}

const CommandFlow: React.FC<CommandFlowProps> = ({
  orderId,
  clientName,
  serviceName,
  onStart,
  onFinish,
  status,
  timer,
  className,
  style,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [showPaymentSelect, setShowPaymentSelect] = useState(false);

  const handleStartCommand = () => {
    onStart();
  };

  const handleFinishClick = () => {
    setShowPaymentSelect(true);
  };

  const handleConfirmFinish = () => {
    if (paymentMethod) {
      onFinish(paymentMethod);
      setShowPaymentSelect(false);
      setPaymentMethod('');
    }
  };

  const formatTimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={cn('management-item border-0', className)} style={style}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{clientName}</CardTitle>
            <p className="text-sm text-muted-foreground">{serviceName}</p>
          </div>
          <StatusIndicator status={status} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Timer Display */}
        {status === 'active' && (
          <div
            className="flex items-center justify-center p-4 bg-primary/10 rounded-lg animate-fade-in"
          >
            <Clock className="w-5 h-5 text-primary mr-2" />
            <span className="text-2xl font-mono font-bold text-primary">
              {formatTimer(timer)}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {status === 'waiting' && (
            <div
              className="flex-1 animate-fade-in"
            >
              <Button
                onClick={handleStartCommand}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar Comanda
              </Button>
            </div>
          )}

          {status === 'active' && !showPaymentSelect && (
            <div
              className="flex-1 animate-fade-in"
            >
              <Button
                onClick={handleFinishClick}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl font-semibold"
              >
                <Square className="w-4 h-4 mr-2" />
                Finalizar e Registrar Pagamento
              </Button>
            </div>
          )}
        </div>

        {/* Payment Method Selection */}
        {showPaymentSelect && (
            <div
              className="space-y-3 overflow-hidden animate-fade-in"
            >
              <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Forma de Pagamento</span>
                </div>
                
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a forma de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="cartao">Cartão</SelectItem>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    onClick={handleConfirmFinish}
                    disabled={!paymentMethod}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Confirmar Finalização
                  </Button>
                  <Button
                    onClick={() => setShowPaymentSelect(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
        )}

        {status === 'completed' && (
          <div
            className="text-center p-3 bg-green-500/10 rounded-lg animate-fade-in"
          >
            <p className="text-green-400 font-medium">Serviço Concluído</p>
            <p className="text-sm text-muted-foreground">
              Duração: {formatTimer(timer)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommandFlow;
