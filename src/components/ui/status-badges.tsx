
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, AlertCircle, Calendar, Scissors, Users, DollarSign } from 'lucide-react';

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'done' | 'cancelled';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  className
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pendente',
          icon: Clock,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
      case 'confirmed':
        return {
          label: 'Confirmado',
          icon: CheckCircle,
          className: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'done':
        return {
          label: 'Concluído',
          icon: CheckCircle,
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      case 'cancelled':
        return {
          label: 'Cancelado',
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200',
        };
      default:
        return {
          label: status,
          icon: AlertCircle,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-0.5';
      case 'lg':
        return 'text-sm px-3 py-1';
      default:
        return 'text-xs px-2.5 py-0.5';
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center font-medium border rounded-full transition-colors',
        config.className,
        getSizeClasses(),
        className
      )}
    >
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  );
};

interface MetricBadgeProps {
  type: 'revenue' | 'bookings' | 'clients' | 'services';
  value: string | number;
  label: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

export const MetricBadge: React.FC<MetricBadgeProps> = ({
  type,
  value,
  label,
  trend,
  className
}) => {
  const getIconAndColor = () => {
    switch (type) {
      case 'revenue':
        return { icon: DollarSign, color: 'text-green-600' };
      case 'bookings':
        return { icon: Calendar, color: 'text-blue-600' };
      case 'clients':
        return { icon: Users, color: 'text-purple-600' };
      case 'services':
        return { icon: Scissors, color: 'text-orange-600' };
      default:
        return { icon: AlertCircle, color: 'text-gray-600' };
    }
  };

  const { icon: Icon, color } = getIconAndColor();

  return (
    <div className={cn(
      'inline-flex items-center gap-2 bg-card border rounded-lg px-3 py-2 shadow-sm',
      className
    )}>
      <Icon className={cn('w-4 h-4', color)} />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      {trend && (
        <div className={cn(
          'text-xs font-medium',
          trend.direction === 'up' ? 'text-green-600' : 
          trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
        )}>
          {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'} {trend.value}%
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
