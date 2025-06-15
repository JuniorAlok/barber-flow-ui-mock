
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
import { SectionTitle, Caption } from '@/components/ui/typography';

const TABS = [
  {
    id: 'dashboard',
    title: 'Dashboard Administrativo',
    description: 'Visão geral das métricas e atividades da barbearia',
    component: <DashboardMetrics />,
  },
  {
    id: 'bookings',
    title: 'Gerenciar Agendamentos',
    description: 'Visualize e gerencie todos os agendamentos',
    component: <BookingManagement />,
  },
  {
    id: 'finances',
    title: 'Controle Financeiro',
    description: 'Controle de receitas, despesas e relatórios financeiros',
    component: <FinanceModule />,
  },
  {
    id: 'clients',
    title: 'Gerenciar Clientes',
    description: 'Cadastro e gerenciamento de clientes',
    component: <ClientManagement />,
  },
  {
    id: 'services',
    title: 'Gerenciar Serviços',
    description: 'Configuração de serviços e preços',
    component: <ServiceManagement />,
  },
  {
    id: 'barbers',
    title: 'Gerenciar Barbeiros',
    description: 'Gerenciamento da equipe de barbeiros',
    component: <BarberManagement />,
  },
  {
    id: 'configurations',
    title: 'Configurações',
    description: 'Configurações gerais do sistema',
    component: <ConfigurationManagement />,
  },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const activeTabData = TABS.find((tab) => tab.id === activeTab) || TABS[0];

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1">
            <header className="border-b bg-card">
              <div className="flex h-16 items-center page-padding">
                <SidebarTrigger className="md:hidden" />
                <div className="ml-4 md:ml-0">
                  <SectionTitle as="h1" className="!text-base !font-semibold !mb-0">{activeTabData.title}</SectionTitle>
                  <Caption as="p" className="!text-xs !font-normal">{activeTabData.description}</Caption>
                </div>
              </div>
            </header>
            <div className="page-padding">
              <div>
                {activeTabData.component}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;
