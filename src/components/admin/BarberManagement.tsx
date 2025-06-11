
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import { useUpdateEntity } from '@/hooks/useUpdateEntity';
import { formatPercentage } from '@/utils/formatting';
import BarberModal from './modals/BarberModal';

const BarberManagement: React.FC = () => {
  const { barbers, setBarbers } = useMockData();
  const { toggleStatus, isUpdating } = useUpdateEntity({
    data: barbers,
    setData: setBarbers,
    entityName: 'Barbeiro'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBarber, setEditingBarber] = useState(null);

  const handleNewBarber = () => {
    setEditingBarber(null);
    setIsModalOpen(true);
  };

  const handleEditBarber = (barber: any) => {
    setEditingBarber(barber);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBarber(null);
  };

  return (
    <>
      <Card className="glass-effect">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gerenciar Barbeiros</CardTitle>
            <Button onClick={handleNewBarber}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Barbeiro
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {barbers.map((barber) => (
              <div key={barber.id} className="p-4 border border-border rounded-lg glass-effect">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={barber.avatarUrl} 
                      alt={barber.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{barber.name}</h3>
                      <p className="text-sm text-muted-foreground">{barber.specialization}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm">{barber.phone}</span>
                        <span className="text-sm">{barber.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBarber(barber)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Comissão:</span>
                        <span className="font-medium">{barber.commission}%</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        ⭐ {barber.rating} | {barber.experience}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={barber.isActive}
                        onCheckedChange={(checked) => toggleStatus(barber.id, checked)}
                        disabled={isUpdating}
                      />
                      <span className="text-sm">
                        {barber.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <BarberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        barber={editingBarber}
      />
    </>
  );
};

export default BarberManagement;
