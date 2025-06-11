
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BarberLoginComponent from "@/components/BarberLogin";
import { PageLoading } from "@/components/ui/loading";

const BarberLogin = () => {
  const { isAuthenticated, isBarber } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('BarberLogin: Auth state check:', { isAuthenticated, isBarber });
    
    if (isAuthenticated && isBarber) {
      console.log('BarberLogin: Already authenticated barber - redirecting to dashboard');
      navigate('/barber/dashboard', { replace: true });
    }
  }, [isAuthenticated, isBarber, navigate]);

  if (isAuthenticated && isBarber) {
    return <PageLoading />;
  }

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-10">
        <Link to="/landing">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o Site
          </Button>
        </Link>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <Link to="/admin/login">
          <Button variant="outline" size="sm">
            Login Admin
          </Button>
        </Link>
      </div>
      
      <BarberLoginComponent />
    </div>
  );
};

export default BarberLogin;
