
import { AppProviders } from "@/contexts/AppProviders";
import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/components/AdminDashboard";
import BarberDashboard from "@/components/BarberDashboard";
import BarberLogin from "@/components/BarberLogin";
import HomePage from "@/components/HomePage";
import { PageLoading } from "@/components/ui/loading";
import { Suspense } from "react";

function AppContent() {
  const { isAuthenticated, isAdmin, isBarber } = useAuth();

  if (!isAuthenticated) {
    return <BarberLogin />;
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  if (isBarber) {
    return <BarberDashboard />;
  }

  return <HomePage />;
}

const Index = () => {
  return (
    <AppProviders>
      <Suspense fallback={<PageLoading />}>
        <AppContent />
      </Suspense>
    </AppProviders>
  );
};

export default Index;
