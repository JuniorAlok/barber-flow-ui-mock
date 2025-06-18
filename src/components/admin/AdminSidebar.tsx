
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Calendar, 
  DollarSign, 
  UserCheck, 
  Scissors, 
  Users, 
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Agendamentos",
    url: "bookings",
    icon: Calendar,
    badge: "12",
  },
  {
    title: "Finanças",
    url: "finances",
    icon: DollarSign,
    badge: null,
  },
  {
    title: "Clientes",
    url: "clients",
    icon: UserCheck,
    badge: null,
  },
  {
    title: "Serviços",
    url: "services",
    icon: Scissors,
    badge: null,
  },
  {
    title: "Barbeiros",
    url: "barbers",
    icon: Users,
    badge: null,
  },
  {
    title: "Configurações",
    url: "configurations",
    icon: Settings,
    badge: null,
  },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const { user, logout } = useAuth();

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-6 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">ELITE STUDIO</h2>
            <p className="text-xs text-muted-foreground font-medium">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.url)}
                    isActive={activeTab === item.url}
                    className={cn(
                      "w-full rounded-xl transition-all duration-200 group",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:bg-accent focus:text-accent-foreground",
                      activeTab === item.url && "bg-primary text-primary-foreground shadow-sm"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/30">
        <div className="space-y-3">
          <div className="flex items-center gap-3 glass-effect p-3 rounded-xl">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {user?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={logout}
            className="w-full rounded-xl border-border/50 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2"  />
            Sair
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
