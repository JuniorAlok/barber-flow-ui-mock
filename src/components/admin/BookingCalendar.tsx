import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useMockData } from '@/contexts/MockDataContext';
import { formatDate } from '@/utils/formatting';
import { Calendar as CalendarIcon, Clock, User, Scissors, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionTitle, Caption } from '@/components/ui/typography';

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
      case 'confirmed': return 'status-success';
      case 'pending': return 'status-warning';
      case 'done': return 'status-info';
      case 'cancelled': return 'status-error';
      default: return 'bg-muted text-muted-foreground';
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
      <Card className="management-card animate-fade-in">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <SectionTitle as="div" className="!mb-0">Calendário de Agendamentos</SectionTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigateMonth('prev')}
                className="focus-ring"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigateMonth('next')}
                className="focus-ring"
              >
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
            className="rounded-md border border-border/30 w-full"
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
      <Card className="management-card animate-fade-in">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <SectionTitle as="div" className="!mb-0">
              {selectedDate ? formatDate(selectedDate.toISOString()) : 'Selecione uma data'}
            </SectionTitle>
            <Button onClick={onNewBooking} className="btn-luxury focus-ring">
              Novo Agendamento
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {selectedDateBookings.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <Caption as="p" className="!text-sm">Nenhum agendamento para esta data</Caption>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  onClick={() => onEditBooking(booking)}
                  className="management-item p-4 cursor-pointer hover:bg-primary/5 transition-colors animate-slide-up focus-ring"
                  style={{ animationDelay: `${index * 100}ms` }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onEditBooking(booking);
                    }
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                      <Caption className="font-medium !text-sm text-foreground">{booking.time}</Caption>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-responsive-xs">
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <Caption className="truncate !text-xs">{booking.clientName}</Caption>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Scissors className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <Caption className="truncate !text-xs">{getServiceName(booking.serviceId)}</Caption>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <Caption className="truncate !text-xs">{getBarberName(booking.barberId)}</Caption>
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
