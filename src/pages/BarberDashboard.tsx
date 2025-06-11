
import { AppProviders } from "@/contexts/AppProviders";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BarberDashboard from "@/components/BarberDashboard";

function ProtectedBarberDashboard() {
  const { isAuthenticated, isBarber } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/barber/login');
    } else if (!isBarber) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isBarber, navigate]);

  if (!isAuthenticated || !isBarber) {
    return null;
  }

  return <BarberDashboard />;
}

const BarberDashboardPage = () => {
  return (
    <AppProviders>
      <ProtectedBarberDashboard />
    </AppProviders>
  );
};

export default BarberDashboardPage;
