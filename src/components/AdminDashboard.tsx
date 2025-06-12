
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import DashboardMetrics from '@/components/DashboardMetrics';
import FinanceModule from '@/components/FinanceModule';
import ClientManagement from '@/components/ClientManagement';
import BookingManagement from '@/components/admin/BookingManagement';
import ServiceManagement from '@/components/admin/ServiceManagement';
import BarberManagement from '@/components/admin/BarberManagement';
import ConfigurationManagement from '@/components/admin/ConfigurationManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardMetrics />;
      case 'bookings':
        return <BookingManagement />;
      case 'finances':
        return <FinanceModule />;
      case 'clients':
        return <ClientManagement />;
      case 'services':
        return <ServiceManagement />;
      case 'barbers':
        return <BarberManagement />;
      case 'configurations':
        return <ConfigurationManagement />;
      default:
        return <DashboardMetrics />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1">
            <div className="glass-effect-strong border-b border-primary/20 sticky top-0 z-40">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="md:hidden" />
                  <h1 className="text-xl font-bold text-luxury">
                    {activeTab === 'dashboard' && 'Dashboard Administrativo'}
                    {activeTab === 'bookings' && 'Gerenciar Agendamentos'}
                    {activeTab === 'finances' && 'Controle Financeiro'}
                    {activeTab === 'clients' && 'Gerenciar Clientes'}
                    {activeTab === 'services' && 'Gerenciar Serviços'}
                    {activeTab === 'barbers' && 'Gerenciar Barbeiros'}
                    {activeTab === 'configurations' && 'Configurações'}
                  </h1>
                </div>
              </div>
            </div>
            <div className="container mx-auto p-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;
