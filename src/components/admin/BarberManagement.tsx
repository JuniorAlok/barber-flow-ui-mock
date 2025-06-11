
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useMockData } from '@/contexts/MockDataContext';
import { toast } from '@/hooks/use-toast';
import InlineEdit from '@/components/InlineEdit';

const BarberManagement: React.FC = () => {
  const { barbers, setBarbers } = useMockData();

  const toggleBarberStatus = (barberId: string, isActive: boolean) => {
    setBarbers(prev => prev.map(barber =>
      barber.id === barberId ? { ...barber, isActive } : barber
    ));
    toast({
      title: isActive ? "Barbeiro ativado" : "Barbeiro desativado",
      description: `O barbeiro foi ${isActive ? 'ativado' : 'desativado'} com sucesso.`
    });
  };

  const updateBarberField = (barberId: string, field: string, value: any) => {
    setBarbers(prev => prev.map(barber =>
      barber.id === barberId ? { ...barber, [field]: value } : barber
    ));
    toast({
      title: "Barbeiro atualizado",
      description: "As informações do barbeiro foram atualizadas."
    });
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Gerenciar Barbeiros</CardTitle>
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
                    <InlineEdit
                      value={barber.name}
                      onSave={(value) => updateBarberField(barber.id, 'name', value)}
                      className="text-lg font-semibold"
                    />
                    <InlineEdit
                      value={barber.specialization}
                      onSave={(value) => updateBarberField(barber.id, 'specialization', value)}
                      className="text-sm text-muted-foreground"
                    />
                    <div className="flex items-center space-x-4 mt-2">
                      <InlineEdit
                        value={barber.phone}
                        onSave={(value) => updateBarberField(barber.id, 'phone', value)}
                        className="text-sm"
                      />
                      <InlineEdit
                        value={barber.email}
                        onSave={(value) => updateBarberField(barber.id, 'email', value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Comissão:</span>
                      <InlineEdit
                        value={barber.commission}
                        onSave={(value) => updateBarberField(barber.id, 'commission', Number(value))}
                        type="number"
                        className="font-medium"
                      />
                      <span className="text-sm">%</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      ⭐ {barber.rating} | {barber.experience}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={barber.isActive}
                      onCheckedChange={(checked) => toggleBarberStatus(barber.id, checked)}
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
  );
};

export default BarberManagement;
