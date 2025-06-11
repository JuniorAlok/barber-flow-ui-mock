
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import { useUpdateEntity } from '@/hooks/useUpdateEntity';
import { formatCurrency } from '@/utils/formatting';
import ServiceModal from './modals/ServiceModal';

const ServiceManagement: React.FC = () => {
  const { services, setServices } = useMockData();
  const { toggleStatus, isUpdating } = useUpdateEntity({
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
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                  </div>
                  <div className="flex items-center space-x-6">
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
                        <span className="font-medium">{service.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm">Preço:</span>
                        <span className="font-medium text-primary">{formatCurrency(service.price)}</span>
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
