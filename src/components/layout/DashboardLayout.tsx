
/**
 * Dashboard Layout Component (Modernizado)
 * Layout principal com design system atualizado
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex flex-1 flex-col">
          {/* Header moderno com glass effect */}
          <header className="sticky top-0 z-20 glass-effect-strong border-b border-border/30">
            <div className="container-responsive flex h-16 items-center">
              <SidebarTrigger className="md:hidden mr-4 rounded-lg" />
              <AdminHeader />
            </div>
          </header>

          {/* Main Content com melhor estrutura */}
          <main className={cn(
            "flex-1 container-responsive py-8",
            "animate-fade-in",
            className
          )}>
            <div className="space-y-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
