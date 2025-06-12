
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Clock, CreditCard } from 'lucide-react';
import { formatTime } from '@/utils/formatting';
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
    <Card className={cn('management-item border-0', className)}>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center p-4 bg-primary/10 rounded-lg"
          >
            <Clock className="w-5 h-5 text-primary mr-2" />
            <span className="text-2xl font-mono font-bold text-primary">
              {formatTimer(timer)}
            </span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {status === 'waiting' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <Button
                onClick={handleStartCommand}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar Comanda
              </Button>
            </motion.div>
          )}

          {status === 'active' && !showPaymentSelect && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <Button
                onClick={handleFinishClick}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl font-semibold"
              >
                <Square className="w-4 h-4 mr-2" />
                Finalizar e Registrar Pagamento
              </Button>
            </motion.div>
          )}
        </div>

        {/* Payment Method Selection */}
        <AnimatePresence>
          {showPaymentSelect && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
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
            </motion.div>
          )}
        </AnimatePresence>

        {status === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-3 bg-green-500/10 rounded-lg"
          >
            <p className="text-green-400 font-medium">Serviço Concluído</p>
            <p className="text-sm text-muted-foreground">
              Duração: {formatTimer(timer)}
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommandFlow;
