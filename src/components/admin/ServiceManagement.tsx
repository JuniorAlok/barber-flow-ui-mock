
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useMockData } from '@/contexts/MockDataContext';
import { toast } from '@/hooks/use-toast';
import InlineEdit from '@/components/InlineEdit';

const ServiceManagement: React.FC = () => {
  const { services, setServices } = useMockData();

  const toggleServiceStatus = (serviceId: string, isActive: boolean) => {
    setServices(prev => prev.map(service =>
      service.id === serviceId ? { ...service, isActive } : service
    ));
    toast({
      title: isActive ? "Serviço ativado" : "Serviço desativado",
      description: `O serviço foi ${isActive ? 'ativado' : 'desativado'} com sucesso.`
    });
  };

  const updateServiceField = (serviceId: string, field: string, value: any) => {
    setServices(prev => prev.map(service =>
      service.id === serviceId ? { ...service, [field]: value } : service
    ));
    toast({
      title: "Serviço atualizado",
      description: "As informações do serviço foram atualizadas."
    });
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Gerenciar Serviços</CardTitle>
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
                      onSave={(value) => updateServiceField(service.id, 'title', value)}
                      className="text-lg font-semibold"
                    />
                    <InlineEdit
                      value={service.description}
                      onSave={(value) => updateServiceField(service.id, 'description', value)}
                      type="textarea"
                      className="text-sm text-muted-foreground mt-1"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Duração:</span>
                      <InlineEdit
                        value={service.duration}
                        onSave={(value) => updateServiceField(service.id, 'duration', Number(value))}
                        type="number"
                        className="font-medium"
                      />
                      <span className="text-sm">min</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm">Preço: R$</span>
                      <InlineEdit
                        value={service.price}
                        onSave={(value) => updateServiceField(service.id, 'price', Number(value))}
                        type="number"
                        className="font-medium text-primary"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={service.isActive}
                      onCheckedChange={(checked) => toggleServiceStatus(service.id, checked)}
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
  );
};

export default ServiceManagement;
