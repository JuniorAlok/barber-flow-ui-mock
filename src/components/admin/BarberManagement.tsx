
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
      <Card className="management-card border-0 animate-fade-in">
        <CardHeader className="pb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Gerenciar Barbeiros</CardTitle>
                <p className="text-sm text-muted-foreground">Configure sua equipe de profissionais</p>
              </div>
            </div>
            <Button 
              onClick={handleNewBarber}
              className="gradient-glow hover:scale-105 transition-all duration-300"
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
                className="management-item p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img 
                        src={barber.avatarUrl} 
                        alt={barber.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300"
                      />
                      {barber.isActive && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{barber.name}</h3>
                        <Badge 
                          variant={barber.isActive ? "default" : "secondary"}
                          className={barber.isActive ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
                        >
                          {barber.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{barber.specialization}</p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{barber.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{barber.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="font-medium text-foreground">{barber.rating}</span>
                          <span className="text-muted-foreground">| {barber.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBarber(barber)}
                      className="hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-muted-foreground">Comissão:</span>
                        <span className="font-medium text-primary">{barber.commission}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={barber.isActive}
                        onCheckedChange={(checked) => toggleStatus(barber.id, checked)}
                        disabled={isUpdating}
                        className="data-[state=checked]:bg-primary"
                      />
                      <span className="text-sm text-muted-foreground">
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
