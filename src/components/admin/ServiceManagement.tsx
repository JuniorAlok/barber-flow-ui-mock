
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Clock, DollarSign } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import { useUpdateEntity } from '@/hooks/useUpdateEntity';
import { formatCurrency } from '@/utils/formatting';
import ServiceModal from './modals/ServiceModal';
import { SectionTitle, Caption, Subtitle, Highlight } from '@/components/ui/typography';

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
      <Card>
        <CardHeader className="pb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg border">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <SectionTitle as="div" className="!mb-0">Gerenciar Serviços</SectionTitle>
                <Caption as="p" className="!text-xs !font-normal">Configure os serviços oferecidos</Caption>
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
                className="border rounded-lg p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <Subtitle as="h3" className="!text-base !font-semibold !mb-0">{service.title}</Subtitle>
                      <Badge 
                        variant={service.isActive ? "default" : "secondary"}
                      >
                        {service.isActive ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <Caption as="p" className="!text-xs !font-normal mb-3">{service.description}</Caption>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2 text-responsive-xs">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <Caption>Duração:</Caption>
                        <Caption className="text-foreground">{service.duration} min</Caption>
                      </div>
                      <div className="flex items-center space-x-2 text-responsive-xs">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <Caption>Preço:</Caption>
                        <Highlight className="!font-medium">{formatCurrency(service.price)}</Highlight>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditService(service)}
                    >
                      <Edit className="w-4 h-4" />
                      <span className="ml-2 sm:hidden">Editar</span>
                    </Button>
                    <div className="flex items-center justify-between sm:justify-start space-x-2">
                      <Switch
                        checked={service.isActive}
                        onCheckedChange={(checked) => toggleStatus(service.id, checked)}
                        disabled={isUpdating}
                      />
                      <Caption className="!text-xs !font-normal">
                        {service.isActive ? 'Ativo' : 'Inativo'}
                      </Caption>
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
