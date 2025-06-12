
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ui/image-upload';
import { PhoneInput } from '@/components/ui/phone-input';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { UserCog, Save, User, Phone, Briefcase, Clock } from 'lucide-react';
import { toast } from 'sonner';

const BarberProfileSettings: React.FC = () => {
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

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (!currentBarber) return;

    setBarbers(prev => prev.map(barber => 
      barber.id === currentBarber.id 
        ? { ...barber, ...formData }
        : barber
    ));

    toast.success('Perfil atualizado com sucesso!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentBarber?.name || '',
      phone: currentBarber?.phone || '',
      specialization: currentBarber?.specialization || '',
      experience: currentBarber?.experience || '',
      avatarUrl: currentBarber?.avatarUrl || ''
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!currentBarber) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="management-card border-0">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5">
                <UserCog className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Configurações do Perfil</CardTitle>
                <p className="text-sm text-muted-foreground">Gerencie suas informações pessoais</p>
              </div>
            </div>
            
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="btn-luxury"
              >
                <UserCog className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-border/30"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="btn-luxury"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Photo Upload Section */}
          <div className="flex flex-col items-center">
            <ImageUpload
              value={formData.avatarUrl}
              onChange={(url) => handleInputChange('avatarUrl', url)}
              name={formData.name}
              size="lg"
              showUploadButton={isEditing}
            />
            {isEditing && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Clique na câmera para alterar sua foto de perfil
              </p>
            )}
          </div>

          {/* Profile Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome Completo
              </Label>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-background/50 border-border/30"
                />
              ) : (
                <div className="glass-effect p-3 rounded-lg">
                  <span className="text-white">{formData.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-300 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone
              </Label>
              {isEditing ? (
                <PhoneInput
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  className="bg-background/50 border-border/30"
                  showActions={false}
                />
              ) : (
                <div className="glass-effect p-3 rounded-lg">
                  <PhoneInput
                    value={formData.phone}
                    onChange={() => {}}
                    showActions={true}
                    whatsappMessage="Olá! Gostaria de agendar um horário."
                    readOnly
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Especialização
              </Label>
              {isEditing ? (
                <Input
                  value={formData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  placeholder="Ex: Cortes Clássicos"
                  className="bg-background/50 border-border/30"
                />
              ) : (
                <div className="glass-effect p-3 rounded-lg">
                  <span className="text-white">{formData.specialization}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Experiência
              </Label>
              {isEditing ? (
                <Textarea
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="Ex: 8 anos de experiência"
                  className="bg-background/50 border-border/30 min-h-[80px]"
                />
              ) : (
                <div className="glass-effect p-3 rounded-lg">
                  <span className="text-white">{formData.experience}</span>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-effect p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary mb-1">{currentBarber.rating}</div>
              <div className="text-xs text-gray-400">Avaliação</div>
            </div>
            <div className="glass-effect p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary mb-1">{currentBarber.commission}%</div>
              <div className="text-xs text-gray-400">Comissão</div>
            </div>
            <div className="glass-effect p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary mb-1">150+</div>
              <div className="text-xs text-gray-400">Clientes</div>
            </div>
            <div className="glass-effect p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary mb-1">98%</div>
              <div className="text-xs text-gray-400">Satisfação</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarberProfileSettings;
