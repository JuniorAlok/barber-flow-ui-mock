
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Star, Phone, Mail, Users } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import { useUpdateEntity } from '@/hooks/useUpdateEntity';
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
      <Card className="management-card animate-fade-in">
        <CardHeader className="pb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-responsive-lg text-luxury">Gerenciar Barbeiros</CardTitle>
                <p className="text-responsive-xs text-muted-foreground">Configure sua equipe de profissionais</p>
              </div>
            </div>
            <Button 
              onClick={handleNewBarber}
              className="gradient-glow focus-ring hover-lift"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Barbeiro
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {barbers.map((barber, index) => (
              <div 
                key={barber.id} 
                className="management-item p-4 sm:p-6 animate-slide-up hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={barber.avatarUrl} 
                        alt={barber.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300"
                      />
                      {barber.isActive && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                        <h3 className="text-responsive-base font-semibold text-foreground">{barber.name}</h3>
                        <Badge 
                          variant={barber.isActive ? "default" : "secondary"}
                          className={barber.isActive ? "status-success" : ""}
                        >
                          {barber.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <p className="text-responsive-xs text-muted-foreground mb-3">{barber.specialization}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-responsive-xs">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground truncate">{barber.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground truncate">{barber.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                          <span className="font-medium text-foreground">{barber.rating}</span>
                          <span className="text-muted-foreground">| {barber.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBarber(barber)}
                      className="focus-ring"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="ml-2 sm:hidden">Editar</span>
                    </Button>
                    <div className="flex items-center justify-between sm:justify-start">
                      <div className="text-right mr-4">
                        <div className="flex items-center space-x-2 text-responsive-xs">
                          <span className="text-muted-foreground">Comissão:</span>
                          <span className="font-medium text-primary">{barber.commission}%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={barber.isActive}
                          onCheckedChange={(checked) => toggleStatus(barber.id, checked)}
                          disabled={isUpdating}
                          className="focus-ring"
                        />
                        <span className="text-responsive-xs text-muted-foreground">
                          {barber.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
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
