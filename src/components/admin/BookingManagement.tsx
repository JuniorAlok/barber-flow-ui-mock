
import React, { useState, useMemo } from 'react';
import { useBookingActions } from '@/hooks/useBookingActions';
import { useBookingStatus } from '@/hooks/useBookingStatus';
import BookingModal from './modals/BookingModal';
import BookingCalendar from './BookingCalendar';
import BookingTable from './BookingTable';
import ViewModeToggle from './ViewModeToggle';
import { useDateFilter } from '@/hooks/useDateFilter';
import DateRangeFilter from '@/components/ui/DateRangeFilter';
import { isWithinInterval } from 'date-fns';
import { Card, CardHeader } from '@/components/ui/card';
import { SectionTitle } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type ViewMode = 'list' | 'calendar';

const BookingManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { getStatusBadge } = useBookingStatus();
  const {
    bookings,
    isModalOpen,
    editingBooking,
    handleNewBooking,
    handleEditBooking,
    handleCloseModal,
    updateBookingStatus,
    deleteBooking,
    getServiceName,
    getBarberName,
  } = useBookingActions();
  const { period, dateRange, setPeriod, setDateRange, filteredDateRange } = useDateFilter();

  const filteredBookings = useMemo(() => {
    if (!filteredDateRange.from || !filteredDateRange.to) return [];
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return isWithinInterval(bookingDate, { start: filteredDateRange.from!, end: filteredDateRange.to! });
    });
  }, [bookings, filteredDateRange]);

  const renderCalendarView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <ViewModeToggle
          viewMode={viewMode}
          setViewMode={setViewMode}
          onNewBooking={handleNewBooking}
          showNewButton={false}
        />
        <Button
          onClick={handleNewBooking}
          className="btn-luxury hover-lift"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>
      <BookingCalendar 
        bookings={filteredBookings}
        onNewBooking={handleNewBooking}
        onEditBooking={handleEditBooking}
      />
    </div>
  );

  return (
    <div className="space-y-6">
       <Card className="management-card">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <SectionTitle as="div" className="!mb-0">Filtrar Período</SectionTitle>
            <DateRangeFilter
              period={period}
              onPeriodChange={setPeriod}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </CardHeader>
      </Card>

      {viewMode === 'list' ? (
        <BookingTable
          bookings={filteredBookings}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onNewBooking={handleNewBooking}
          onEditBooking={handleEditBooking}
          onUpdateStatus={updateBookingStatus}
          onDeleteBooking={deleteBooking}
          getServiceName={getServiceName}
          getBarberName={getBarberName}
          getStatusBadge={getStatusBadge}
        />
      ) : (
        renderCalendarView()
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        booking={editingBooking}
      />
    </div>
  );
};

export default BookingManagement;
