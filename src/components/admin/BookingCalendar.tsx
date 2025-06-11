
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
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
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      done: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
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

  return (
    <Card className="glass-effect">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <CardTitle>
              {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Button onClick={onNewBooking}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map(day => {
            const dayBookings = getBookingsForDay(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <div
                key={day.toString()}
                className={`min-h-[100px] p-1 border border-border rounded-lg ${
                  !isSameMonth(day, currentDate) ? 'opacity-50' : ''
                } ${isToday ? 'bg-primary/5 border-primary' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                  {format(day, 'd')}
                </div>
                
                <div className="space-y-1">
                  {dayBookings.slice(0, 3).map(booking => (
                    <div
                      key={booking.id}
                      className="text-xs p-1 rounded cursor-pointer hover:shadow-sm transition-shadow"
                      onClick={() => onEditBooking(booking)}
                    >
                      <Badge variant="outline" className={`text-xs ${getStatusColor(booking.status)}`}>
                        {booking.time}
                      </Badge>
                      <div className="truncate mt-1 text-xs">
                        {booking.clientName}
                      </div>
                    </div>
                  ))}
                  
                  {dayBookings.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{dayBookings.length - 3} mais
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
