
import React, { Suspense, lazy } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ClipboardList, BarChart3, UserCog } from 'lucide-react';
import { Loading } from '@/components/ui/loading';

const BarberServiceOrders = lazy(() => import('./BarberServiceOrders'));
const BarberBookingManagement = lazy(() => import('./BarberBookingManagement'));
const BarberMetrics = lazy(() => import('./BarberMetrics'));
const BarberProfileSettings = lazy(() => import('./BarberProfileSettings'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <Loading text="Carregando..." />
  </div>
);

const BarberTabs: React.FC = () => {
  return (
    <div className="container-responsive">
      <Tabs defaultValue="orders" className="space-y-4 md:space-y-6">
        <TabsList className="grid w-full grid-cols-4 management-card h-12 md:h-auto p-1 md:p-1">
          <TabsTrigger 
            value="orders" 
            className="text-responsive-xs p-2 md:p-3 h-full focus-ring"
          >
            <ClipboardList className="w-4 h-4 mr-0 md:mr-2" />
            <span className="hidden sm:inline">Comandas</span>
            <span className="sm:hidden text-xs">Cmd</span>
          </TabsTrigger>
          <TabsTrigger 
            value="bookings" 
            className="text-responsive-xs p-2 md:p-3 h-full focus-ring"
          >
            <Calendar className="w-4 h-4 mr-0 md:mr-2" />
            <span className="hidden sm:inline">Agendamentos</span>
            <span className="sm:hidden text-xs">Agd</span>
          </TabsTrigger>
          <TabsTrigger 
            value="metrics" 
            className="text-responsive-xs p-2 md:p-3 h-full focus-ring"
          >
            <BarChart3 className="w-4 h-4 mr-0 md:mr-2" />
            <span className="hidden sm:inline">Métricas</span>
            <span className="sm:hidden text-xs">Met</span>
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            className="text-responsive-xs p-2 md:p-3 h-full focus-ring"
          >
            <UserCog className="w-4 h-4 mr-0 md:mr-2" />
            <span className="hidden sm:inline">Perfil</span>
            <span className="sm:hidden text-xs">Prf</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4 md:mt-6 animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            <BarberServiceOrders />
          </Suspense>
        </TabsContent>

        <TabsContent value="bookings" className="mt-4 md:mt-6 animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            <BarberBookingManagement />
          </Suspense>
        </TabsContent>

        <TabsContent value="metrics" className="mt-4 md:mt-6 animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            <BarberMetrics />
          </Suspense>
        </TabsContent>

        <TabsContent value="profile" className="mt-4 md:mt-6 animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            <BarberProfileSettings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BarberTabs;
