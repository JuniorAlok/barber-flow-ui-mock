
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

const menuItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: BarChart3,
  },
  {
    title: "Agendamentos",
    url: "bookings",
    icon: Calendar,
  },
  {
    title: "Finanças",
    url: "finances",
    icon: DollarSign,
  },
  {
    title: "Clientes",
    url: "clients",
    icon: UserCheck,
  },
  {
    title: "Serviços",
    url: "services",
    icon: Scissors,
  },
  {
    title: "Barbeiros",
    url: "barbers",
    icon: Users,
  },
  {
    title: "Configurações",
    url: "configurations",
    icon: Settings,
  },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const { user, logout } = useAuth();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-bold text-lg">ELITE STUDIO</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.url)}
                    isActive={activeTab === item.url}
                    className="w-full"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="bg-accent/20 text-accent">
                {user?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={logout}
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
