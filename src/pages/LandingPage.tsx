
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "@/components/HomePage";

const LandingPage = () => {
  const { isAuthenticated, isAdmin, isBarber } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('LandingPage: Auth state check:', { isAuthenticated, isAdmin, isBarber });
    
    if (isAuthenticated) {
      if (isAdmin) {
        console.log('LandingPage: Authenticated admin - redirecting to admin dashboard');
        navigate('/admin/dashboard', { replace: true });
      } else if (isBarber) {
        console.log('LandingPage: Authenticated barber - redirecting to barber dashboard');
        navigate('/barber/dashboard', { replace: true });
      }
      // If authenticated but no specific role, stay on landing page
    }
  }, [isAuthenticated, isAdmin, isBarber, navigate]);

  return <HomePage />;
};

export default LandingPage;
