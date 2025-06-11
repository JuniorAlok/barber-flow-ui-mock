
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Booking } from '@/data/types';
import ViewModeToggle from './ViewModeToggle';

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
  return (
    <Card className="glass-effect">
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditBooking(booking)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BookingTable;
