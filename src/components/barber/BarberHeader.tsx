
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, UserCog, Scissors, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BarberProfileEdit from './BarberProfileEdit';

const BarberHeader: React.FC = () => {
  const { logout, user } = useAuth();
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  return (
    <>
      <header className="glass-effect-strong border-b border-primary/20 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center p-4 md:p-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 glass-effect rounded-xl flex items-center justify-center">
              <Scissors className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-luxury tracking-wide">
                ELITE STUDIO
              </h1>
              <p className="text-xs md:text-sm text-gray-400">
                Painel do Barbeiro {user?.name && `• ${user.name}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-3 glass-effect px-3 md:px-4 py-2 rounded-lg">
              <UserCog className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-sm font-medium text-gray-300">Dashboard Barbeiro</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsProfileEditOpen(true)}
              className="border-primary/30 hover:border-primary bg-transparent hidden md:flex"
            >
              <Edit className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Perfil</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="border-primary/30 hover:border-primary bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <BarberProfileEdit 
        isOpen={isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
      />
    </>
  );
};

export default BarberHeader;
