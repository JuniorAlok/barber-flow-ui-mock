
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, User, Scissors, Search, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { formatDate, formatPhoneNumber } from '@/utils/formatting';

const BarberBookingList: React.FC = () => {
  const { user } = useAuth();
  const { bookings, services, barbers } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const currentBarber = barbers.find(b => b.email === user?.email);
  
  const barberBookings = bookings.filter(booking => 
    booking.barberId === currentBarber?.id
  );

  const filteredBookings = barberBookings.filter(booking => {
    const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.clientPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.title || 'Serviço não encontrado';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
      done: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    const labels = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      done: 'Concluído',
      cancelled: 'Cancelado'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    // Esta funcionalidade seria implementada no contexto real
    console.log('Updating booking status:', bookingId, newStatus);
  };

  const groupBookingsByDate = (bookings: any[]) => {
    return bookings.reduce((groups, booking) => {
      const date = booking.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(booking);
      return groups;
    }, {} as Record<string, any[]>);
  };

  const groupedBookings = groupBookingsByDate(filteredBookings);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="management-card border-0">
        <CardHeader className="pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5">
                <Calendar className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Meus Agendamentos</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {filteredBookings.length} agendamento(s) encontrado(s)
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border/30"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-background border border-border/30 rounded-md text-sm"
              >
                <option value="all">Todos os status</option>
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
                <option value="done">Concluído</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {Object.keys(groupedBookings).length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedBookings)
                .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                .map(([date, dateBookings]) => (
                  <div key={date} className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-primary">{formatDate(date)}</h3>
                      <div className="flex-1 h-px bg-border/30"></div>
                    </div>

                    <div className="grid gap-3">
                      {dateBookings
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((booking) => (
                          <div
                            key={booking.id}
                            className="glass-effect p-4 rounded-lg hover:bg-primary/5 transition-colors"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span className="font-medium">{booking.time}</span>
                                  </div>
                                  {getStatusBadge(booking.status)}
                                </div>

                                <div className="grid md:grid-cols-3 gap-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <User className="h-3 w-3 text-muted-foreground" />
                                    <span>{booking.clientName}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Scissors className="h-3 w-3 text-muted-foreground" />
                                    <span>{getServiceName(booking.serviceId)}</span>
                                  </div>
                                  <div className="text-muted-foreground">
                                    {formatPhoneNumber(booking.clientPhone)}
                                  </div>
                                </div>

                                {booking.notes && (
                                  <p className="text-sm text-muted-foreground italic">
                                    "{booking.notes}"
                                  </p>
                                )}
                              </div>

                              <div className="flex gap-2">
                                {booking.status === 'pending' && (
                                  <Button
                                    size="sm"
                                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                    className="btn-luxury"
                                  >
                                    Confirmar
                                  </Button>
                                )}
                                {booking.status === 'confirmed' && (
                                  <Button
                                    size="sm"
                                    onClick={() => updateBookingStatus(booking.id, 'done')}
                                    className="btn-luxury"
                                  >
                                    Finalizar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BarberBookingList;
