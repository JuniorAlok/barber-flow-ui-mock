
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const variants = {
    waiting: { variant: "secondary" as const, label: "Aguardando", color: "text-yellow-400" },
    in_progress: { variant: "default" as const, label: "Em Andamento", color: "text-blue-400" },
    completed: { variant: "outline" as const, label: "Concluído", color: "text-green-400" },
    cancelled: { variant: "destructive" as const, label: "Cancelado", color: "text-red-400" }
  };
  
  const config = variants[status as keyof typeof variants] || variants.waiting;
  
  return (
    <Badge variant={config.variant} className={config.color}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
