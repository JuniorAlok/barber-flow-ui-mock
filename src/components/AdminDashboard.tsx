
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { PageHeader } from '@/components/ui/modern-layout';
import ModernLayout from '@/components/ui/modern-layout';
import DashboardMetrics from '@/components/DashboardMetrics';
import FinanceModule from '@/components/FinanceModule';
import ClientManagement from '@/components/ClientManagement';
import BookingManagement from '@/components/admin/BookingManagement';
import ServiceManagement from '@/components/admin/ServiceManagement';
import BarberManagement from '@/components/admin/BarberManagement';
import ConfigurationManagement from '@/components/admin/ConfigurationManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Administrativo';
      case 'bookings': return 'Gerenciar Agendamentos';
      case 'finances': return 'Controle Financeiro';
      case 'clients': return 'Gerenciar Clientes';
      case 'services': return 'Gerenciar Serviços';
      case 'barbers': return 'Gerenciar Barbeiros';
      case 'configurations': return 'Configurações';
      default: return 'Dashboard Administrativo';
    }
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case 'dashboard': return 'Visão geral das métricas e atividades da barbearia';
      case 'bookings': return 'Visualize e gerencie todos os agendamentos';
      case 'finances': return 'Controle de receitas, despesas e relatórios financeiros';
      case 'clients': return 'Cadastro e gerenciamento de clientes';
      case 'services': return 'Configuração de serviços e preços';
      case 'barbers': return 'Gerenciamento da equipe de barbeiros';
      case 'configurations': return 'Configurações gerais do sistema';
      default: return '';
    }
  };

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
    <ModernLayout variant="dashboard">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1">
            <PageHeader
              title={getPageTitle()}
              description={getPageDescription()}
              actions={
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="md:hidden" />
                </div>
              }
            />
            <div className="container-responsive page-padding">
              <div className="animate-fade-in">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ModernLayout>
  );
};

export default AdminDashboard;
