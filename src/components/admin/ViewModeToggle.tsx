
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, List, Plus } from 'lucide-react';

type ViewMode = 'list' | 'calendar';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onNewBooking: () => void;
  showNewButton?: boolean;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ 
  viewMode, 
  setViewMode, 
  onNewBooking,
  showNewButton = true 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={viewMode === 'list' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewMode('list')}
      >
        <List className="w-4 h-4 mr-2" />
        Lista
      </Button>
      <Button
        variant={viewMode === 'calendar' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewMode('calendar')}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Calendário
      </Button>
      {showNewButton && (
        <Button onClick={onNewBooking}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      )}
    </div>
  );
};

export default ViewModeToggle;
