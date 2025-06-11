
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Scissors, LogIn, UserPlus } from 'lucide-react';

const BarberLogin: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialization: ''
  });
  
  const { login, registerBarber } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(loginEmail, loginPassword)) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao seu painel, barbeiro.",
      });
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerBarber(registerData)) {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Seu perfil foi criado e você já está logado.",
      });
    } else {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
              <Scissors className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">IA Barber</h1>
          <p className="text-muted-foreground">Painel do Barbeiro</p>
        </div>

        <Card className="glass-effect border-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </TabsTrigger>
              <TabsTrigger value="register">
                <UserPlus className="w-4 h-4 mr-2" />
                Cadastrar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Fazer Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full gradient-glow">
                    Entrar
                  </Button>
                </form>

                <div className="mt-6 text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                  <p><strong>Email de teste:</strong> carlos@iabarber.com</p>
                  <p><strong>Senha:</strong> barber123</p>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Cadastrar-se</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="specialization">Especialização</Label>
                    <Input
                      id="specialization"
                      value={registerData.specialization}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, specialization: e.target.value }))}
                      placeholder="Ex: Cortes Modernos, Barbas..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full gradient-glow">
                    Cadastrar
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default BarberLogin;
