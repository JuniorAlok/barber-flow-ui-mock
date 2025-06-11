
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BarberDashboard from "@/components/BarberDashboard";
import { PageLoading } from "@/components/ui/loading";

const BarberDashboardPage = () => {
  const { isAuthenticated, isBarber } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('BarberDashboard: Auth state:', { isAuthenticated, isBarber });
    
    if (!isAuthenticated) {
      console.log('BarberDashboard: Not authenticated, redirecting to barber login');
      navigate('/barber/login', { replace: true });
    } else if (!isBarber) {
      console.log('BarberDashboard: Not barber, redirecting to admin dashboard');
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, isBarber, navigate]);

  if (!isAuthenticated || !isBarber) {
    return <PageLoading />;
  }

  return <BarberDashboard />;
};

export default BarberDashboardPage;
