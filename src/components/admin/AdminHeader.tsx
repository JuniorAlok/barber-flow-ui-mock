
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Shield, BarChart3, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AdminHeader: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
          <Shield className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-responsive-xl font-bold tracking-wide text-foreground">
            ELITE STUDIO
          </h1>
          <p className="text-responsive-xs text-muted-foreground font-medium">Painel Administrativo</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-3 glass-effect px-4 py-2 rounded-xl">
          <BarChart3 className="w-5 h-5 text-primary" />
          <span className="text-responsive-sm font-medium text-foreground">Dashboard Admin</span>
        </div>

        <div className="hidden md:block">
          <Button variant="ghost" size="icon" className="relative rounded-xl">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500 hover:bg-red-500">
              3
            </Badge>
          </Button>
        </div>
        
        <ThemeToggle variant="icon-only" />
        
        <div className="hidden sm:flex items-center gap-3 glass-effect px-3 py-2 rounded-xl">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {user?.name?.charAt(0) || 'A'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-foreground">{user?.name || 'Admin'}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={logout}
          className="rounded-xl border-border/50 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-200"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
