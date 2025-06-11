
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BarberLoginComponent from "@/components/BarberLogin";

const BarberLogin = () => {
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
