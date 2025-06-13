
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AppProviders } from "@/contexts/AppProviders";
import { useTheme } from "@/hooks/useTheme";
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import BarberLogin from "./pages/BarberLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BarberDashboard from "./pages/BarberDashboard";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import ScaffoldDemo from "./pages/ScaffoldDemo";

const queryClient = new QueryClient();

const ThemeInitializer = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  
  useEffect(() => {
    console.log('App: Theme initialized:', theme);
  }, [theme]);

  return <>{children}</>;
};

const App = () => {
  console.log('App: Component rendering');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppProviders>
            <ThemeInitializer>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/landing" element={<LandingPage />} />
                  <Route path="/scaffold" element={<ScaffoldDemo />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/barber/login" element={<BarberLogin />} />
                  <Route path="/barber/dashboard" element={<BarberDashboard />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ThemeInitializer>
          </AppProviders>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
