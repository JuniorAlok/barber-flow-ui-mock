
import { AppProviders } from "@/contexts/AppProviders";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLoading } from "@/components/ui/loading";

function IndexContent() {
  const { isAuthenticated, isAdmin, isBarber } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else if (isBarber) {
        navigate('/barber/dashboard', { replace: true });
      }
    } else {
      navigate('/landing', { replace: true });
    }
  }, [isAuthenticated, isAdmin, isBarber, navigate]);

  return <PageLoading />;
}

const Index = () => {
  return (
    <AppProviders>
      <IndexContent />
    </AppProviders>
  );
};

export default Index;
