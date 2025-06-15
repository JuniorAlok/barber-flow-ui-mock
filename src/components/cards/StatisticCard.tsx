/**
 * Statistic Card Component
 * Displays metrics with trend indicators and animations
 */
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatisticCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
  loading?: boolean;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'default',
  className,
  loading = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'status-success border-green-500/30';
      case 'warning':
        return 'status-warning border-yellow-500/30';
      case 'error':
        return 'status-error border-red-500/30';
      default:
        return 'management-card';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend.direction) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-500" />;
      default:
        return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    
    switch (trend.direction) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <Card className={cn('animate-pulse', getVariantStyles(), className)}>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      'hover-lift hover-glow transition-all duration-300 h-full',
      getVariantStyles(),
      className
    )}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          {Icon && (
            <div className="p-2 rounded-lg bg-accent/10">
              <Icon className="w-5 h-5 text-accent" />
            </div>
          )}
        </div>
        
        <div className="space-y-2 mt-auto">
          <p className="text-3xl font-bold tracking-tight text-luxury">
            {value}
          </p>
          
          <div className="flex items-center justify-between">
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
            
            {trend && (
              <div className={cn(
                'flex items-center gap-1 text-sm font-medium',
                getTrendColor()
              )}>
                {getTrendIcon()}
                <span>{Math.abs(trend.value)}%</span>
                {trend.label && (
                  <span className="text-muted-foreground ml-1">
                    {trend.label}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Statistics Grid Component
 * Responsive grid layout for multiple statistic cards
 */
interface StatisticsGridProps {
  stats: StatisticCardProps[];
  loading?: boolean;
  className?: string;
}

export const StatisticsGrid: React.FC<StatisticsGridProps> = ({
  stats,
  loading = false,
  className
}) => {
  return (
    <div className={cn(
      'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
      className
    )}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <StatisticCard {...stat} loading={loading} />
        </div>
      ))}
    </div>
  );
};

export default StatisticCard;
