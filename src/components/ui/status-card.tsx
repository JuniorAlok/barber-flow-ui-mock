
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle, XCircle, LucideIcon } from 'lucide-react';

interface StatusCardProps {
  status: 'success' | 'pending' | 'warning' | 'error';
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
  animated?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({
  status,
  title,
  description,
  icon,
  action,
  className,
  animated = true
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          bgClass: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20',
          borderClass: 'border-green-200 dark:border-green-800',
          iconColor: 'text-green-600 dark:text-green-400',
          badgeClass: 'status-success',
          defaultIcon: CheckCircle
        };
      case 'pending':
        return {
          bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20',
          borderClass: 'border-blue-200 dark:border-blue-800',
          iconColor: 'text-blue-600 dark:text-blue-400',
          badgeClass: 'status-info',
          defaultIcon: Clock
        };
      case 'warning':
        return {
          bgClass: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/20',
          borderClass: 'border-yellow-200 dark:border-yellow-800',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          badgeClass: 'status-warning',
          defaultIcon: AlertCircle
        };
      case 'error':
        return {
          bgClass: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20',
          borderClass: 'border-red-200 dark:border-red-800',
          iconColor: 'text-red-600 dark:text-red-400',
          badgeClass: 'status-error',
          defaultIcon: XCircle
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = icon || config.defaultIcon;

  return (
    <Card 
      className={cn(
        'relative overflow-hidden border-2 transition-all duration-300',
        config.bgClass,
        config.borderClass,
        animated && 'animate-fade-in hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={cn(
            'flex-shrink-0 p-2 rounded-full bg-background/50 backdrop-blur-sm',
            animated && 'animate-scale-in'
          )}>
            <IconComponent className={cn('w-6 h-6', config.iconColor)} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground truncate">
                {title}
              </h3>
              <Badge className={config.badgeClass}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
            
            {description && (
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {description}
              </p>
            )}
            
            {action && (
              <div className="mt-4">
                {action}
              </div>
            )}
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
