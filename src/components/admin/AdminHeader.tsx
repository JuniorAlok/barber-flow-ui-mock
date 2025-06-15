
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Shield, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="border-b bg-card">
      <div className="container-responsive flex justify-between items-center py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center border">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-responsive-xl font-bold tracking-wide">
              ELITE STUDIO
            </h1>
            <p className="text-responsive-xs text-muted-foreground">Painel Administrativo</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 border px-4 py-2 rounded-lg">
            <BarChart3 className="w-5 h-5" />
            <span className="text-responsive-sm font-medium">Dashboard Admin</span>
          </div>
          
          <ThemeToggle variant="icon-only" />
          
          <Button variant="outline" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

