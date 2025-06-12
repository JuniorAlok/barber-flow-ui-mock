
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface StatusNotesSectionProps {
  status: 'pending' | 'confirmed' | 'done' | 'cancelled';
  notes: string;
  showStatus: boolean;
  onStatusChange: (value: 'pending' | 'confirmed' | 'done' | 'cancelled') => void;
  onNotesChange: (value: string) => void;
}

const StatusNotesSection: React.FC<StatusNotesSectionProps> = ({
  status,
  notes,
  showStatus,
  onStatusChange,
  onNotesChange
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {showStatus && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Status</label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full rounded-xl bg-zinc-900 text-white border-zinc-700 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700">
              <SelectItem value="pending" className="text-white hover:bg-zinc-800">Pendente</SelectItem>
              <SelectItem value="confirmed" className="text-white hover:bg-zinc-800">Confirmado</SelectItem>
              <SelectItem value="done" className="text-white hover:bg-zinc-800">Concluído</SelectItem>
              <SelectItem value="cancelled" className="text-white hover:bg-zinc-800">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Observações</label>
        <Textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Observações adicionais..."
          rows={3}
          className="rounded-xl bg-zinc-900 text-white border-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
        />
      </div>
    </div>
  );
};

export default StatusNotesSection;
