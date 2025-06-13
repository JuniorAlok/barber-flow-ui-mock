
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Shield, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="border-b bg-card/95 backdrop-blur-md sticky top-0 z-40">
      <div className="container-responsive flex justify-between items-center py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-responsive-xl font-bold tracking-wide text-luxury">
              ELITE STUDIO
            </h1>
            <p className="text-responsive-xs text-muted-foreground">Painel Administrativo</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-lg backdrop-blur-sm">
            <BarChart3 className="w-5 h-5 text-accent" />
            <span className="text-responsive-sm font-medium">Dashboard Admin</span>
          </div>
          
          <ThemeToggle variant="icon-only" />
          
          <Button variant="outline" onClick={logout} className="focus-ring">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
