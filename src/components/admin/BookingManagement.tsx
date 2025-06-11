
import React, { useState } from 'react';
import { useBookingActions } from '@/hooks/useBookingActions';
import { useBookingStatus } from '@/hooks/useBookingStatus';
import BookingModal from './modals/BookingModal';
import BookingCalendar from './BookingCalendar';
import BookingTable from './BookingTable';
import ViewModeToggle from './ViewModeToggle';

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

  const renderCalendarView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <ViewModeToggle
          viewMode={viewMode}
          setViewMode={setViewMode}
          onNewBooking={handleNewBooking}
          showNewButton={false}
        />
      </div>
      <BookingCalendar 
        onNewBooking={handleNewBooking}
        onEditBooking={handleEditBooking}
      />
    </div>
  );

  return (
    <>
      {viewMode === 'list' ? (
        <BookingTable
          bookings={bookings}
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
    </>
  );
};

export default BookingManagement;
