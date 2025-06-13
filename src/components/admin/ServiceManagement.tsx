
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Clock, DollarSign } from 'lucide-react';
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
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <DollarSign className="h-5 w-5 text-accent" />
              </div>
              <div>
                <CardTitle>Gerenciar Serviços</CardTitle>
                <p className="text-sm text-muted-foreground">Configure os serviços oferecidos</p>
              </div>
            </div>
            <Button onClick={handleNewService}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Serviço
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="border rounded-lg p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <Badge variant={service.isActive ? "default" : "secondary"}>
                        {service.isActive ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Duração:</span>
                        <span className="font-medium">{service.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">Preço:</span>
                        <span className="font-medium text-accent">{formatCurrency(service.price)}</span>
                      </div>
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
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={service.isActive}
                        onCheckedChange={(checked) => toggleStatus(service.id, checked)}
                        disabled={isUpdating}
                      />
                      <span className="text-sm text-muted-foreground">
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
