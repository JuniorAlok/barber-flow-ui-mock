
import React, { useState, Suspense, lazy } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SectionTitle, Caption } from '@/components/ui/typography';
import { Loading } from '@/components/ui/loading';

const DashboardMetrics = lazy(() => import('@/components/DashboardMetrics'));
const FinanceModule = lazy(() => import('@/components/FinanceModule'));
const ClientManagement = lazy(() => import('@/components/ClientManagement'));
const BookingManagement = lazy(() => import('@/components/admin/BookingManagement'));
const ServiceManagement = lazy(() => import('@/components/admin/ServiceManagement'));
const BarberManagement = lazy(() => import('@/components/admin/BarberManagement'));
const ConfigurationManagement = lazy(() => import('@/components/admin/ConfigurationManagement'));

const TABS = [
  {
    id: 'dashboard',
    title: 'Dashboard Executivo',
    description: 'Visão geral das métricas e performance da barbearia',
    Component: DashboardMetrics,
  },
  {
    id: 'bookings',
    title: 'Gerenciar Agendamentos',
    description: 'Visualize e gerencie todos os agendamentos dos clientes',
    Component: BookingManagement,
  },
  {
    id: 'finances',
    title: 'Controle Financeiro',
    description: 'Gestão de receitas, despesas e relatórios financeiros',
    Component: FinanceModule,
  },
  {
    id: 'clients',
    title: 'Gerenciar Clientes',
    description: 'Cadastro e relacionamento com clientes',
    Component: ClientManagement,
  },
  {
    id: 'services',
    title: 'Gerenciar Serviços',
    description: 'Configuração de serviços, preços e promoções',
    Component: ServiceManagement,
  },
  {
    id: 'barbers',
    title: 'Gerenciar Barbeiros',
    description: 'Administração da equipe de barbeiros',
    Component: BarberManagement,
  },
  {
    id: 'configurations',
    title: 'Configurações do Sistema',
    description: 'Configurações gerais e personalizações',
    Component: ConfigurationManagement,
  },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const activeTabData = TABS.find((tab) => tab.id === activeTab) || TABS[0];
  const ActiveComponent = activeTabData.Component;

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1">
            {/* Header moderno */}
            <header className="sticky top-0 z-20 glass-effect-strong border-b border-border/30">
              <div className="flex h-16 items-center page-padding">
                <SidebarTrigger className="md:hidden mr-4 rounded-lg" />
                <div className="flex items-center justify-between w-full">
                  <div>
                    <SectionTitle as="h1" className="!text-lg !font-bold !mb-1 text-foreground">
                      {activeTabData.title}
                    </SectionTitle>
                    <Caption as="p" className="!text-sm !font-normal text-muted-foreground">
                      {activeTabData.description}
                    </Caption>
                  </div>
                  <div className="hidden md:flex items-center gap-2 glass-effect px-3 py-1.5 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-muted-foreground">Sistema Online</span>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Content area com melhor estrutura */}
            <div className="page-padding min-h-[calc(100vh-4rem)]">
              <div className="max-w-none">
                <Suspense fallback={
                  <div className="flex justify-center items-center py-20">
                    <Loading text="Carregando módulo..." />
                  </div>
                }>
                  <div className="animate-fade-in">
                    <ActiveComponent />
                  </div>
                </Suspense>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;
