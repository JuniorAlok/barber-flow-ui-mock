
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

const BookingManagement: React.FC = () => {
  const { bookings, setBookings, services, barbers } = useMockData();

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus as any }
          : booking
      )
    );
    toast({
      title: "Status atualizado",
      description: "O status do agendamento foi alterado com sucesso.",
    });
  };

  const deleteBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    toast({
      title: "Agendamento removido",
      description: "O agendamento foi removido com sucesso.",
    });
  };

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

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.title || 'Serviço não encontrado';
  };

  const getBarberName = (barberId: string) => {
    return barbers.find(b => b.id === barberId)?.name || 'Barbeiro não encontrado';
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Gerenciar Agendamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Barbeiro</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{booking.clientName}</div>
                    <div className="text-sm text-muted-foreground">{booking.clientPhone}</div>
                  </div>
                </TableCell>
                <TableCell>{getServiceName(booking.serviceId)}</TableCell>
                <TableCell>{getBarberName(booking.barberId)}</TableCell>
                <TableCell>
                  {format(new Date(booking.date), 'dd/MM/yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Select
                      value={booking.status}
                      onValueChange={(value) => updateBookingStatus(booking.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="confirmed">Confirmar</SelectItem>
                        <SelectItem value="done">Concluído</SelectItem>
                        <SelectItem value="cancelled">Cancelar</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteBooking(booking.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BookingManagement;
