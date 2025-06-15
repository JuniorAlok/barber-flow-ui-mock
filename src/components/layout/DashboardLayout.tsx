
/**
 * Dashboard Layout Component (Refatorado)
 * Separa Sidebar e Header em arquivos próprios, usando AdminSidebar e AdminHeader
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
          {/* Header */}
          <header className="border-b sticky top-0 z-20 bg-background/90 backdrop-blur-sm">
            <div className="container-responsive flex h-16 items-center">
                <SidebarTrigger className="md:hidden mr-4" />
                <AdminHeader />
            </div>
          </header>

          {/* Main Content */}
          <main className={cn(
            "container-responsive flex-1 py-6",
            "grid grid-cols-12 gap-6",
            className
          )}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
