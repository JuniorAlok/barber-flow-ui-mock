
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Booking } from '@/data/types';
import ViewModeToggle from './ViewModeToggle';
import EnhancedTable from '@/components/ui/enhanced-table';

type ViewMode = 'list' | 'calendar';

interface BookingTableProps {
  bookings: Booking[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onNewBooking: () => void;
  onEditBooking: (booking: Booking) => void;
  onUpdateStatus: (bookingId: string, status: string) => void;
  onDeleteBooking: (bookingId: string) => void;
  getServiceName: (serviceId: string) => string;
  getBarberName: (barberId: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  viewMode,
  setViewMode,
  onNewBooking,
  onEditBooking,
  onUpdateStatus,
  onDeleteBooking,
  getServiceName,
  getBarberName,
  getStatusBadge,
}) => {
  const columns = [
    {
      header: 'Cliente',
      key: 'client',
      render: (_, booking: Booking) => (
        <div>
          <div className="font-medium">{booking.clientName}</div>
          <div className="text-sm text-muted-foreground">{booking.clientPhone}</div>
        </div>
      ),
    },
    {
      header: 'Serviço',
      key: 'service',
      render: (_, booking: Booking) => getServiceName(booking.serviceId),
    },
    {
      header: 'Barbeiro',
      key: 'barber',
      render: (_, booking: Booking) => getBarberName(booking.barberId),
    },
    {
      header: 'Data',
      key: 'date',
      render: (_, booking: Booking) => 
        format(new Date(booking.date), 'dd/MM/yyyy', { locale: ptBR }),
    },
    {
      header: 'Horário',
      key: 'time',
      render: (_, booking: Booking) => booking.time,
    },
    {
      header: 'Status',
      key: 'status',
      render: (_, booking: Booking) => getStatusBadge(booking.status),
    },
    {
      header: 'Ações',
      key: 'actions',
      render: (_, booking: Booking) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditBooking(booking)}
            className="hover:bg-primary/10"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Select
            value={booking.status}
            onValueChange={(value) => onUpdateStatus(booking.id, value)}
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
            onClick={() => onDeleteBooking(booking.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="glass-effect border-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Gerenciar Agendamentos</CardTitle>
          <ViewModeToggle
            viewMode={viewMode}
            setViewMode={setViewMode}
            onNewBooking={onNewBooking}
          />
        </div>
      </CardHeader>
      <CardContent>
        <EnhancedTable
          columns={columns}
          data={bookings}
          hoverable={true}
          striped={false}
          className="rounded-xl overflow-hidden"
        />
      </CardContent>
    </Card>
  );
};

export default BookingTable;
