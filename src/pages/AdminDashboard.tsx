
import { AppProviders } from "@/contexts/AppProviders";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "@/components/AdminDashboard";

function ProtectedAdminDashboard() {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    } else if (!isAdmin) {
      navigate('/barber/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <AdminDashboard />;
}

const AdminDashboardPage = () => {
  return (
    <AppProviders>
      <ProtectedAdminDashboard />
    </AppProviders>
  );
};

export default AdminDashboardPage;
