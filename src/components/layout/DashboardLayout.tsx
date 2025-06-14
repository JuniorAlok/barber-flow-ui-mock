
/**
 * Dashboard Layout Component (Refatorado)
 * Separa Sidebar e Header em arquivos próprios, usando AdminSidebar e AdminHeader
 */
import React from 'react';
import { cn } from '@/lib/utils';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className
}) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-64 glass-effect-strong border-r border-border/50">
        <AdminSidebar activeTab="dashboard" onTabChange={() => {}} />
      </aside>

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <header className="glass-effect-strong border-b border-border/50 sticky top-0 z-20">
          <AdminHeader />
        </header>

        {/* Main Content */}
        <main className={cn(
          "container-responsive py-6",
          "grid grid-cols-12 gap-6",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
