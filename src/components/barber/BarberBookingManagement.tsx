
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, List } from 'lucide-react';
import BarberBookingList from './BarberBookingList';
import BookingCalendar from '../admin/BookingCalendar';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';

const BarberBookingManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const { user } = useAuth();
  const { bookings } = useMockData();

  const handleNewBooking = () => {
    console.log('Nova reserva - funcionalidade a ser implementada');
  };

  const handleEditBooking = (booking: any) => {
    console.log('Editar reserva:', booking);
  };

  const barberBookings = user ? bookings.filter(b => b.barberId === user.id) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'btn-luxury' : ''}
          >
            <List className="w-4 h-4 mr-2" />
            Lista
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
            className={viewMode === 'calendar' ? 'btn-luxury' : ''}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendário
          </Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <BarberBookingList />
      ) : (
        <BookingCalendar 
          bookings={barberBookings}
          onNewBooking={handleNewBooking}
          onEditBooking={handleEditBooking}
        />
      )}
    </div>
  );
};

export default BarberBookingManagement;
