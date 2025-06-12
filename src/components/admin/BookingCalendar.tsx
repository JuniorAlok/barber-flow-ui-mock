
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useMockData } from '@/contexts/MockDataContext';
import { formatDate } from '@/utils/formatting';
import { Calendar as CalendarIcon, Clock, User, Scissors, ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingCalendarProps {
  onNewBooking: () => void;
  onEditBooking: (booking: any) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onNewBooking, onEditBooking }) => {
  const { bookings, services, barbers } = useMockData();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getBookingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => booking.date === dateStr);
  };

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.title || 'Serviço não encontrado';
  };

  const getBarberName = (barberId: string) => {
    return barbers.find(b => b.id === barberId)?.name || 'Barbeiro não encontrado';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'done': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate) : [];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Calendar View */}
      <Card className="management-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <CardTitle>Calendário de Agendamentos</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-md border border-border/30"
            modifiers={{
              hasBookings: (date) => getBookingsForDate(date).length > 0
            }}
            modifiersStyles={{
              hasBookings: {
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                fontWeight: 'bold'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      <Card className="management-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {selectedDate ? formatDate(selectedDate.toISOString()) : 'Selecione uma data'}
            </CardTitle>
            <Button onClick={onNewBooking} className="btn-luxury">
              Novo Agendamento
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {selectedDateBookings.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum agendamento para esta data</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateBookings.map((booking) => (
                <div
                  key={booking.id}
                  onClick={() => onEditBooking(booking)}
                  className="glass-effect p-4 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium">{booking.time}</span>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{booking.clientName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Scissors className="h-3 w-3 text-muted-foreground" />
                      <span>{getServiceName(booking.serviceId)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{getBarberName(booking.barberId)}</span>
                    </div>
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

export default BookingCalendar;
