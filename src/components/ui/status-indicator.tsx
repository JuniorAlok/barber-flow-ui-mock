
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'active' | 'pending' | 'completed' | 'cancelled' | 'waiting';
  label?: string;
  showIcon?: boolean;
  animated?: boolean;
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  showIcon = true,
  animated = true,
  className,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          variant: 'default' as const,
          className: 'bg-green-600 text-white border-green-500',
          icon: <CheckCircle className="w-3 h-3" />,
          defaultLabel: 'Atendimento Ativo',
        };
      case 'pending':
        return {
          variant: 'secondary' as const,
          className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          icon: <Clock className="w-3 h-3" />,
          defaultLabel: 'Aguardando',
        };
      case 'completed':
        return {
          variant: 'outline' as const,
          className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          icon: <CheckCircle className="w-3 h-3" />,
          defaultLabel: 'Concluído',
        };
      case 'cancelled':
        return {
          variant: 'destructive' as const,
          className: 'bg-red-500/20 text-red-400 border-red-500/30',
          icon: <XCircle className="w-3 h-3" />,
          defaultLabel: 'Cancelado',
        };
      case 'waiting':
        return {
          variant: 'outline' as const,
          className: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          icon: <Clock className="w-3 h-3" />,
          defaultLabel: 'Aguardando Cliente',
        };
      default:
        return {
          variant: 'outline' as const,
          className: '',
          icon: null,
          defaultLabel: 'Status',
        };
    }
  };

  const config = getStatusConfig();
  const displayLabel = label || config.defaultLabel;

  const BadgeContent = (
    <Badge
      variant={config.variant}
      className={cn(
        'text-xs font-medium',
        config.className,
        className
      )}
    >
      {showIcon && config.icon && (
        <span className="mr-1">{config.icon}</span>
      )}
      {displayLabel}
    </Badge>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {BadgeContent}
      </motion.div>
    );
  }

  return BadgeContent;
};

export default StatusIndicator;
