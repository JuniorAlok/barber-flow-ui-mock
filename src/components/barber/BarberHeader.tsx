
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { LogOut, Scissors, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BarberHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const { barbers } = useMockData();
  
  const barberData = barbers.find(b => b.id === user?.id);
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return (
    <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
              <Scissors className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">IA Barber</h1>
              <p className="text-sm text-muted-foreground">Painel do Barbeiro</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{currentDate}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{barberData?.name}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Online
                  </Badge>
                  <span className="text-xs text-muted-foreground">{barberData?.specialization}</span>
                </div>
              </div>
              
              <Avatar>
                <AvatarImage src={barberData?.avatarUrl} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {barberData?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BarberHeader;
