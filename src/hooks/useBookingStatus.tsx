
import { Badge } from '@/components/ui/badge';

export const useBookingStatus = () => {
  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "Pendente" },
      confirmed: { variant: "default" as const, label: "Confirmado" },
      done: { variant: "outline" as const, label: "Concluído" },
      cancelled: { variant: "destructive" as const, label: "Cancelado" }
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return { getStatusBadge };
};
