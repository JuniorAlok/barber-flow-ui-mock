
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { UserCog, Camera, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface BarberProfileEditProps {
  isOpen: boolean;
  onClose: () => void;
}

const BarberProfileEdit: React.FC<BarberProfileEditProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { barbers, setBarbers } = useMockData();
  
  const currentBarber = barbers.find(b => b.email === user?.email);
  
  const [formData, setFormData] = useState({
    name: currentBarber?.name || '',
    phone: currentBarber?.phone || '',
    specialization: currentBarber?.specialization || '',
    experience: currentBarber?.experience || '',
    avatarUrl: currentBarber?.avatarUrl || ''
  });

  const handleSave = () => {
    if (!currentBarber) return;

    setBarbers(prev => prev.map(barber => 
      barber.id === currentBarber.id 
        ? { ...barber, ...formData }
        : barber
    ));

    toast.success('Perfil atualizado com sucesso!');
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen || !currentBarber) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md luxury-card max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCog className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl">Editar Perfil</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-2 border-primary/20">
                <AvatarImage src={formData.avatarUrl} alt={formData.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {formData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 border-primary/30"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="w-full space-y-2">
              <Label htmlFor="avatarUrl" className="text-sm text-gray-300">URL da Foto</Label>
              <Input
                id="avatarUrl"
                value={formData.avatarUrl}
                onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
                placeholder="https://exemplo.com/foto.jpg"
                className="bg-background/50 border-border/30"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-gray-300">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-background/50 border-border/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm text-gray-300">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
                className="bg-background/50 border-border/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-sm text-gray-300">Especialização</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => handleInputChange('specialization', e.target.value)}
                placeholder="Ex: Cortes Clássicos"
                className="bg-background/50 border-border/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-sm text-gray-300">Experiência</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="Ex: 8 anos de experiência"
                className="bg-background/50 border-border/30 min-h-[80px]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border/30"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 btn-luxury"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarberProfileEdit;
