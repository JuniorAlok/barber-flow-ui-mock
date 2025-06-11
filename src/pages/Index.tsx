
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLoading } from "@/components/ui/loading";

const Index = () => {
  const { isAuthenticated, isAdmin, isBarber } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Index: Auth state check:', { isAuthenticated, isAdmin, isBarber });
    
    if (isAuthenticated) {
      if (isAdmin) {
        console.log('Index: Authenticated admin - redirecting to admin dashboard');
        navigate('/admin/dashboard', { replace: true });
      } else if (isBarber) {
        console.log('Index: Authenticated barber - redirecting to barber dashboard');
        navigate('/barber/dashboard', { replace: true });
      } else {
        console.log('Index: Authenticated but unknown role - redirecting to landing');
        navigate('/landing', { replace: true });
      }
    } else {
      console.log('Index: Not authenticated - redirecting to landing page');
      navigate('/landing', { replace: true });
    }
  }, [isAuthenticated, isAdmin, isBarber, navigate]);

  return <PageLoading />;
};

export default Index;
