
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLoading } from "@/components/ui/loading";

const Index = () => {
  const { isAuthenticated, isAdmin, isBarber } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Index: Auth state:', { isAuthenticated, isAdmin, isBarber });
    
    if (isAuthenticated) {
      if (isAdmin) {
        console.log('Index: Redirecting to admin dashboard');
        navigate('/admin/dashboard', { replace: true });
      } else if (isBarber) {
        console.log('Index: Redirecting to barber dashboard');
        navigate('/barber/dashboard', { replace: true });
      }
    } else {
      console.log('Index: Redirecting to landing page');
      navigate('/landing', { replace: true });
    }
  }, [isAuthenticated, isAdmin, isBarber, navigate]);

  return <PageLoading />;
};

export default Index;
