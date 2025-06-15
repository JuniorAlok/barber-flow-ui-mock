
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "@/components/HomePage";

const LandingPage = () => {
  const { isAuthenticated, isAdmin, isBarber } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else if (isBarber) {
        navigate('/barber/dashboard', { replace: true });
      }
      // If authenticated but no specific role, stay on landing page
    }
  }, [isAuthenticated, isAdmin, isBarber, navigate]);

  return <HomePage />;
};

export default LandingPage;
