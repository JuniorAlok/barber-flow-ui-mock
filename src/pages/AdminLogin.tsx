
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Shield, ArrowLeft, Eye, EyeOff, Sparkles, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ModernCard from '@/components/ui/modern-card';
import ModernInput from '@/components/ui/modern-input';
import ModernButton from '@/components/ui/modern-button';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('AdminLogin: Attempting login with:', email);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (login(email, password)) {
      console.log('AdminLogin: Login successful');
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
      navigate('/admin/dashboard', { replace: true });
    } else {
      console.log('AdminLogin: Login failed');
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-accent/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-xl">
                <Shield className="h-10 w-10 text-primary" />
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent mb-2">
            IA Barber
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Painel Administrativo
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Login Form */}
        <ModernCard
          title="Acesso Administrativo"
          subtitle="Entre com suas credenciais"
          icon={<Lock className="h-5 w-5 text-primary" />}
          variant="luxury"
          glow
          className="animate-slide-up"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <ModernInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@iabarber.com"
              icon={<Mail className="w-4 h-4" />}
              variant="luxury"
              required
            />
            
            <ModernInput
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              variant="luxury"
              required
            />
            
            {/* Demo credentials */}
            <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-4 rounded-xl border border-border/50">
              <p className="text-sm font-medium text-muted-foreground mb-2">Credenciais de demonstração:</p>
              <div className="space-y-1 text-xs">
                <p><span className="font-semibold text-foreground">Email:</span> admin@iabarber.com</p>
                <p><span className="font-semibold text-foreground">Senha:</span> Admin123!</p>
              </div>
            </div>
            
            <ModernButton
              type="submit"
              variant="luxury"
              size="lg"
              loading={loading}
              className="w-full"
              glow
            >
              {loading ? 'Entrando...' : 'Entrar como Admin'}
            </ModernButton>
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-center">
              <Link 
                to="/barber/login" 
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Acessar como Barbeiro
              </Link>
            </div>

            <Link to="/landing">
              <ModernButton variant="outline" size="default" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para o Site
              </ModernButton>
            </Link>
          </div>
        </ModernCard>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-xs text-muted-foreground">
            © 2024 IA Barber. Design Moderno & Intuitivo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
