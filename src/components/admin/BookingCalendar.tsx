
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMockData } from '@/contexts/MockDataContext';
import { Booking } from '@/data/types';

interface BookingCalendarProps {
  onNewBooking: () => void;
  onEditBooking: (booking: Booking) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onNewBooking, onEditBooking }) => {
  const { bookings, services, barbers } = useMockData();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getBookingsForDay = (date: Date) => {
    return bookings.filter(booking => 
      isSameDay(new Date(booking.date), date)
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      done: 'bg-green-500/20 text-green-400 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.title || 'Serviço';
  };

  const getBarberName = (barberId: string) => {
    return barbers.find(b => b.id === barberId)?.name || 'Barbeiro';
  };

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const statusLabels = {
    pending: 'Pendente',
    confirmed: 'Confirmado', 
    done: 'Concluído',
    cancelled: 'Cancelado'
  };

  return (
    <Card className="management-card border-0 animate-fade-in">
      <CardHeader className="pb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={prevMonth}
                className="hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5">
                  <CalendarIcon className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Calendário de agendamentos</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={nextMonth}
                className="hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={onNewBooking}
            className="gradient-glow hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground bg-muted/30 rounded-lg">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendário */}
        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((day, index) => {
            const dayBookings = getBookingsForDay(day);
            const isCurrentDay = isToday(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            
            return (
              <div
                key={day.toString()}
                className={`min-h-[120px] p-3 rounded-lg border transition-all duration-300 hover:shadow-md ${
                  !isCurrentMonth ? 'opacity-50 bg-muted/10' : 'glass-effect'
                } ${isCurrentDay ? 'ring-2 ring-primary/50 bg-primary/5' : ''}`}
              >
                <div className={`text-sm font-medium mb-2 flex items-center justify-between ${
                  isCurrentDay ? 'text-primary' : 'text-foreground'
                }`}>
                  <span>{format(day, 'd')}</span>
                  {isCurrentDay && (
                    <div className="w-2 h-2 bg-primary rounded-full floating-element"></div>
                  )}
                </div>
                
                <div className="space-y-1">
                  {dayBookings.slice(0, 2).map(booking => (
                    <div
                      key={booking.id}
                      className="text-xs p-2 rounded-md cursor-pointer hover:shadow-sm transition-all duration-300 glass-effect hover:scale-105"
                      onClick={() => onEditBooking(booking)}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <Badge 
                          variant="outline" 
                          className={`text-xs px-1 py-0 ${getStatusColor(booking.status)}`}
                        >
                          {booking.time}
                        </Badge>
                      </div>
                      <div className="font-medium text-foreground truncate">
                        {booking.clientName}
                      </div>
                      <div className="text-muted-foreground truncate">
                        {getServiceName(booking.serviceId)}
                      </div>
                    </div>
                  ))}
                  
                  {dayBookings.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center p-1 rounded-md bg-muted/20">
                      +{dayBookings.length - 2} mais
                    </div>
                  )}

                  {dayBookings.length === 0 && isCurrentMonth && (
                    <div className="text-xs text-muted-foreground/50 text-center p-2">
                      Sem agendamentos
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="text-sm text-muted-foreground font-medium mb-2">Status dos agendamentos:</div>
          {Object.entries(statusLabels).map(([status, label]) => (
            <div key={status} className="flex items-center space-x-2">
              <Badge variant="outline" className={`${getStatusColor(status)} text-xs`}>
                {label}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
