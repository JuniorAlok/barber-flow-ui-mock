
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import { useUpdateEntity } from '@/hooks/useUpdateEntity';
import { formatCurrency } from '@/utils/formatting';
import InlineEdit from '@/components/InlineEdit';
import ServiceModal from './modals/ServiceModal';

const ServiceManagement: React.FC = () => {
  const { services, setServices } = useMockData();
  const { updateField, toggleStatus, isUpdating } = useUpdateEntity({
    data: services,
    setData: setServices,
    entityName: 'Serviço'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleNewService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  return (
    <>
      <Card className="glass-effect">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gerenciar Serviços</CardTitle>
            <Button onClick={handleNewService}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Serviço
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="p-4 border border-border rounded-lg glass-effect">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <InlineEdit
                        value={service.title}
                        onSave={(value) => updateField(service.id, 'title', value)}
                        className="text-lg font-semibold"
                      />
                      <InlineEdit
                        value={service.description}
                        onSave={(value) => updateField(service.id, 'description', value)}
                        type="textarea"
                        className="text-sm text-muted-foreground mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditService(service)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Duração:</span>
                        <InlineEdit
                          value={service.duration}
                          onSave={(value) => updateField(service.id, 'duration', Number(value))}
                          type="number"
                          className="font-medium"
                        />
                        <span className="text-sm">min</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm">Preço:</span>
                        <InlineEdit
                          value={service.price}
                          onSave={(value) => updateField(service.id, 'price', Number(value))}
                          type="number"
                          className="font-medium text-primary"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={service.isActive}
                        onCheckedChange={(checked) => toggleStatus(service.id, checked)}
                        disabled={isUpdating}
                      />
                      <span className="text-sm">
                        {service.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={editingService}
      />
    </>
  );
};

export default ServiceManagement;
