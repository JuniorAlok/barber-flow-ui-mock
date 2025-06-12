
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Shield, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="glass-effect-strong border-b border-primary/20 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 glass-effect rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-luxury tracking-wide">
              ELITE STUDIO
            </h1>
            <p className="text-sm text-gray-400">Painel Administrativo</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 glass-effect px-4 py-2 rounded-lg">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-gray-300">Dashboard Admin</span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={logout}
            className="border-primary/30 hover:border-primary bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
