
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ModernButton from '@/components/ui/modern-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Square, Clock, CreditCard, Timer } from 'lucide-react';
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

  const getStatusGradient = () => {
    switch (status) {
      case 'active':
        return 'from-green-500/20 to-green-500/5 border-green-500/30';
      case 'completed':
        return 'from-blue-500/20 to-blue-500/5 border-blue-500/30';
      default:
        return 'from-card/90 to-card/70 border-border/30';
    }
  };

  return (
    <Card 
      className={cn(
        'relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1',
        'bg-gradient-to-br backdrop-blur-xl border shadow-xl',
        getStatusGradient(),
        className
      )} 
      style={style}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-foreground">{clientName}</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">{serviceName}</p>
            <p className="text-xs text-muted-foreground">#{orderId.slice(0, 8)}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <StatusIndicator status={status} />
            {status === 'active' && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Timer className="w-3 h-3" />
                <span>Em andamento</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        {/* Enhanced Timer Display */}
        {status === 'active' && (
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20 animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer"></div>
              <div className="flex items-center space-x-3 relative z-10">
                <div className="p-2 rounded-full bg-primary/20 animate-pulse">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <span className="text-3xl font-mono font-bold text-primary tracking-wider">
                  {formatTimer(timer)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {status === 'waiting' && (
            <div className="animate-fade-in">
              <ModernButton
                onClick={handleStartCommand}
                variant="luxury"
                size="lg"
                className="w-full shadow-xl hover:shadow-2xl"
                glow
              >
                <Play className="w-5 h-5 mr-2" />
                Iniciar Comanda
              </ModernButton>
            </div>
          )}

          {status === 'active' && !showPaymentSelect && (
            <div className="animate-fade-in">
              <ModernButton
                onClick={handleFinishClick}
                variant="gradient"
                size="lg"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                pulse
              >
                <Square className="w-5 h-5 mr-2" />
                Finalizar e Registrar Pagamento
              </ModernButton>
            </div>
          )}
        </div>

        {/* Enhanced Payment Method Selection */}
        {showPaymentSelect && (
          <div className="space-y-4 animate-scale-in">
            <div className="p-6 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-md rounded-2xl border border-border/40 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Forma de Pagamento</h4>
                  <p className="text-sm text-muted-foreground">Selecione como o cliente pagou</p>
                </div>
              </div>
              
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="input-luxury h-12">
                  <SelectValue placeholder="Selecione a forma de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>PIX</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="cartao">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Cartão</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dinheiro">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span>Dinheiro</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-3 pt-2">
                <ModernButton
                  onClick={handleConfirmFinish}
                  disabled={!paymentMethod}
                  variant="luxury"
                  className="flex-1"
                  success={!!paymentMethod}
                >
                  Confirmar Finalização
                </ModernButton>
                <ModernButton
                  onClick={() => setShowPaymentSelect(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </ModernButton>
              </div>
            </div>
          </div>
        )}

        {/* Completion Status */}
        {status === 'completed' && (
          <div className="text-center p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-3 animate-scale-in">
              <Square className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-green-400 font-semibold text-lg mb-1">Serviço Concluído</p>
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
