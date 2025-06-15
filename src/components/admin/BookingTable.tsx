
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Booking } from '@/data/types';
import ViewModeToggle from './ViewModeToggle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SectionTitle, Caption } from '@/components/ui/typography';

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
    <Card className="management-card animate-fade-in">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <SectionTitle as="div" className="!mb-0">Gerenciar Agendamentos</SectionTitle>
          <ViewModeToggle
            viewMode={viewMode}
            setViewMode={setViewMode}
            onNewBooking={onNewBooking}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <div className="rounded-md border border-border/30 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead><Caption className="font-semibold text-foreground">Cliente</Caption></TableHead>
                  <TableHead className="hidden sm:table-cell"><Caption className="font-semibold text-foreground">Serviço</Caption></TableHead>
                  <TableHead className="hidden md:table-cell"><Caption className="font-semibold text-foreground">Barbeiro</Caption></TableHead>
                  <TableHead><Caption className="font-semibold text-foreground">Data</Caption></TableHead>
                  <TableHead className="hidden sm:table-cell"><Caption className="font-semibold text-foreground">Horário</Caption></TableHead>
                  <TableHead><Caption className="font-semibold text-foreground">Status</Caption></TableHead>
                  <TableHead><Caption className="font-semibold text-foreground">Ações</Caption></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow 
                    key={booking.id}
                    className="hover:bg-muted/30 transition-colors animate-slide-up border-border/30"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="p-3">
                      <div>
                        <Caption className="font-medium text-foreground !text-sm">{booking.clientName}</Caption>
                        <Caption className="sm:hidden !text-xs !font-normal">
                          {getServiceName(booking.serviceId)}
                        </Caption>
                        <Caption className="!text-xs !font-normal">{booking.clientPhone}</Caption>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell"><Caption className="!text-sm !font-normal">{getServiceName(booking.serviceId)}</Caption></TableCell>
                    <TableCell className="hidden md:table-cell"><Caption className="!text-sm !font-normal">{getBarberName(booking.barberId)}</Caption></TableCell>
                    <TableCell>
                      <div>
                        <Caption className="!text-sm !font-normal">{format(new Date(booking.date), 'dd/MM', { locale: ptBR })}</Caption>
                        <Caption className="sm:hidden !text-xs !font-normal">{booking.time}</Caption>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell"><Caption className="!text-sm !font-normal">{booking.time}</Caption></TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditBooking(booking)}
                          className="focus-ring p-1 sm:p-2"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Select
                          value={booking.status}
                          onValueChange={(value) => onUpdateStatus(booking.id, value)}
                        >
                          <SelectTrigger className="w-20 sm:w-32 h-8 sm:h-9 text-responsive-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
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
                          className="focus-ring p-1 sm:p-2"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingTable;
