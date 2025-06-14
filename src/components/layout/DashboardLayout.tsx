
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
    <div className="min-h-screen bg-neutral-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-64 glass-effect-strong border-r border-neutral-800 bg-neutral-950/95">
        <AdminSidebar activeTab="dashboard" onTabChange={() => {}} />
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 bg-neutral-900 min-h-screen">
        {/* Header */}
        <header className="glass-effect-strong border-b border-neutral-800 sticky top-0 z-20 bg-neutral-950/80">
          <AdminHeader />
        </header>

        {/* Main Content */}
        <main className={cn(
          "container-responsive py-6",
          "grid grid-cols-12 gap-6",
          className,
          "bg-neutral-900 min-h-[calc(100vh-64px)]"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

