
import React, { useState, Suspense, lazy } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Scissors, DollarSign, BarChart3, UserCheck, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { PageTransition } from '@/components/ui/motion-components';
import { Loading } from '@/components/ui/loading';

const DashboardMetrics = lazy(() => import('@/components/DashboardMetrics'));
const FinanceModule = lazy(() => import('@/components/FinanceModule'));
const ClientManagement = lazy(() => import('@/components/ClientManagement'));
const BookingManagement = lazy(() => import('@/components/admin/BookingManagement'));
const ServiceManagement = lazy(() => import('@/components/admin/ServiceManagement'));
const BarberManagement = lazy(() => import('@/components/admin/BarberManagement'));
const ConfigurationManagement = lazy(() => import('@/components/admin/ConfigurationManagement'));

const LoadingFallback = () => (
    <div className="flex justify-center items-center h-64">
      <Loading text="Carregando..." />
    </div>
);

const AdminTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const isMobile = useIsMobile();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {!isMobile && (
          <TabsList className="grid w-full grid-cols-7 glass-effect">
            <TabsTrigger value="dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="finances">
              <DollarSign className="w-4 h-4 mr-2" />
              Finanças
            </TabsTrigger>
            <TabsTrigger value="clients">
              <UserCheck className="w-4 h-4 mr-2" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="services">
              <Scissors className="w-4 h-4 mr-2" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="barbers">
              <Users className="w-4 h-4 mr-2" />
              Barbeiros
            </TabsTrigger>
            <TabsTrigger value="configurations">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>
        )}

        <div className={isMobile ? "pb-20" : ""}>
          <TabsContent value="dashboard">
            {activeTab === 'dashboard' && (
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <DashboardMetrics />
                </Suspense>
              </PageTransition>
            )}
          </TabsContent>

          <TabsContent value="bookings">
            {activeTab === 'bookings' && (
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <BookingManagement />
                </Suspense>
              </PageTransition>
            )}
          </TabsContent>

          <TabsContent value="finances">
            {activeTab === 'finances' && (
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <FinanceModule />
                </Suspense>
              </PageTransition>
            )}
          </TabsContent>

          <TabsContent value="clients">
            {activeTab === 'clients' && (
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <ClientManagement />
                </Suspense>
              </PageTransition>
            )}
          </TabsContent>

          <TabsContent value="services">
            {activeTab === 'services' && (
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <ServiceManagement />
                </Suspense>
              </PageTransition>
            )}
          </TabsContent>

          <TabsContent value="barbers">
            {activeTab === 'barbers' && (
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <BarberManagement />
                </Suspense>
              </PageTransition>
            )}
          </TabsContent>

          <TabsContent value="configurations">
            {activeTab === 'configurations' && (
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <ConfigurationManagement />
                </Suspense>
              </PageTransition>
            )}
          </TabsContent>
        </div>
      </Tabs>

      {isMobile && (
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
        />
      )}
    </>
  );
};

export default AdminTabs;
