
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
      <Card className="management-card border-0 animate-fade-in">
        <CardHeader className="pb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Gerenciar Serviços</CardTitle>
                <p className="text-sm text-muted-foreground">Configure os serviços oferecidos</p>
              </div>
            </div>
            <Button 
              onClick={handleNewService}
              className="gradient-glow hover:scale-105 transition-all duration-300"
            >
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
                className="management-item p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                      <Badge 
                        variant={service.isActive ? "default" : "secondary"}
                        className={service.isActive ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
                      >
                        {service.isActive ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Duração:</span>
                        <span className="font-medium text-foreground">{service.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Preço:</span>
                        <span className="font-medium text-primary">{formatCurrency(service.price)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditService(service)}
                      className="hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={service.isActive}
                        onCheckedChange={(checked) => toggleStatus(service.id, checked)}
                        disabled={isUpdating}
                        className="data-[state=checked]:bg-primary"
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
