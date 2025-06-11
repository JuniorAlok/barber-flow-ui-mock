
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "@/components/AdminDashboard";
import { PageLoading } from "@/components/ui/loading";

const AdminDashboardPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AdminDashboard: Auth state:', { isAuthenticated, isAdmin });
    
    if (!isAuthenticated) {
      console.log('AdminDashboard: Not authenticated, redirecting to admin login');
      navigate('/admin/login', { replace: true });
    } else if (!isAdmin) {
      console.log('AdminDashboard: Not admin, redirecting to barber dashboard');
      navigate('/barber/dashboard', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return <PageLoading />;
  }

  return <AdminDashboard />;
};

export default AdminDashboardPage;
