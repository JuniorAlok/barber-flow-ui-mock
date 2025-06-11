
import { MockDataProvider } from "@/contexts/MockDataContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/components/AdminDashboard";
import BarberDashboard from "@/components/BarberDashboard";
import BarberLogin from "@/components/BarberLogin";
import HomePage from "@/components/HomePage";

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
    <MockDataProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </MockDataProvider>
  );
};

export default Index;
