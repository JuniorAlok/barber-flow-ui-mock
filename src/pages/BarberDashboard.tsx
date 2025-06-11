
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BarberDashboard from "@/components/BarberDashboard";
import { PageLoading } from "@/components/ui/loading";

const BarberDashboardPage = () => {
  const { isAuthenticated, isBarber, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('BarberDashboardPage: Auth state check:', { isAuthenticated, isBarber, user });
    
    if (!isAuthenticated) {
      console.log('BarberDashboardPage: Not authenticated - redirecting to barber login');
      navigate('/barber/login', { replace: true });
    } else if (!isBarber) {
      console.log('BarberDashboardPage: Not a barber - redirecting to landing');
      navigate('/landing', { replace: true });
    } else {
      console.log('BarberDashboardPage: Valid barber access');
    }
  }, [isAuthenticated, isBarber, user, navigate]);

  if (!isAuthenticated || !isBarber) {
    return <PageLoading />;
  }

  return <BarberDashboard />;
};

export default BarberDashboardPage;
