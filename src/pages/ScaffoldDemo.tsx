
/**
 * Scaffold Demo Page
 * Demonstrates all components and sections in a cohesive layout
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, TrendingUp, Scissors, Star, Award } from 'lucide-react';

// Layout Components
import HeroSection from '@/components/layout/HeroSection';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/layout/CTASection';

// Card Components
import { StatisticCard, StatisticsGrid } from '@/components/cards/StatisticCard';

// Form Components
import EnhancedForm from '@/components/forms/EnhancedForm';

// Feedback Components
import { ToastProvider, useToast } from '@/components/feedback/ToastProvider';
import { Modal, ConfirmationModal } from '@/components/feedback/Modal';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Visual Filters
import { VisualFilters, FilterPreview } from '@/components/ui/visual-filters';

const ScaffoldDemo: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentSection, setCurrentSection] = useState<'hero' | 'dashboard'>('hero');
  const { addToast } = useToast();

  // Sample statistics data
  const sampleStats = [
    {
      title: 'Total de Clientes',
      value: '1,234',
      description: 'Clientes ativos',
      icon: Users,
      trend: { value: 12, direction: 'up' as const, label: 'este mês' },
      variant: 'success' as const,
    },
    {
      title: 'Agendamentos',
      value: '89',
      description: 'Esta semana',
      icon: Calendar,
      trend: { value: 8, direction: 'up' as const, label: 'vs semana anterior' },
      variant: 'default' as const,
    },
    {
      title: 'Receita',
      value: 'R$ 12.456',
      description: 'Este mês',
      icon: DollarSign,
      trend: { value: 15, direction: 'up' as const, label: 'vs mês anterior' },
      variant: 'success' as const,
    },
    {
      title: 'Crescimento',
      value: '23%',
      description: 'Taxa de crescimento',
      icon: TrendingUp,
      trend: { value: 5, direction: 'down' as const, label: 'este trimestre' },
      variant: 'warning' as const,
    },
  ];

  const handleFormSubmit = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addToast({
      title: 'Formulário enviado!',
      description: `Obrigado, ${data.name}. Entraremos em contato em breve.`,
      variant: 'success',
    });
  };

  const handleToastDemo = (variant: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: { title: 'Sucesso!', description: 'Operação realizada com sucesso.' },
      error: { title: 'Erro!', description: 'Algo deu errado. Tente novamente.' },
      warning: { title: 'Atenção!', description: 'Verifique os dados antes de continuar.' },
      info: { title: 'Informação', description: 'Esta é uma mensagem informativa.' },
    };

    addToast({
      ...messages[variant],
      variant,
    });
  };

  if (currentSection === 'hero') {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          title="Elite Studio Dashboard"
          subtitle="Gerencie sua barbearia com tecnologia de ponta e design moderno"
          ctaText="Acessar Dashboard"
          onCtaClick={() => setCurrentSection('dashboard')}
        />

        {/* Demo Sections */}
        <section className="py-20">
          <div className="container-responsive">
            {/* Statistics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-luxury mb-8 text-center">
                Métricas do Dashboard
              </h2>
              <StatisticsGrid stats={sampleStats} />
            </motion.div>

            {/* Cards Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-luxury mb-8 text-center">
                Componentes de Card
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="management-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scissors className="w-5 h-5 text-accent" />
                      Serviços
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Gerencie todos os serviços oferecidos pela barbearia.
                    </p>
                  </CardContent>
                </Card>

                <Card className="management-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent" />
                      Avaliações
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Acompanhe a satisfação dos seus clientes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="management-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-accent" />
                      Relatórios
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Relatórios detalhados de performance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Forms Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-luxury mb-8 text-center">
                Formulários Avançados
              </h2>
              <div className="max-w-2xl mx-auto">
                <EnhancedForm onSubmit={handleFormSubmit} />
              </div>
            </motion.div>

            {/* Visual Filters Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-luxury mb-8 text-center">
                Filtros Visuais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FilterPreview title="Blur Effect" filter="blur-md">
                  <div className="h-32 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
                    <p className="text-accent-foreground font-semibold">Conteúdo com Blur</p>
                  </div>
                </FilterPreview>

                <FilterPreview title="Brightness" filter="brightness-125">
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <p className="text-white font-semibold">Conteúdo Brilhante</p>
                  </div>
                </FilterPreview>

                <FilterPreview title="Sepia" filter="sepia">
                  <div className="h-32 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <p className="text-white font-semibold">Conteúdo Sepia</p>
                  </div>
                </FilterPreview>
              </div>
            </motion.div>

            {/* Interactive Components Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-luxury mb-8 text-center">
                Componentes Interativos
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={() => setShowModal(true)} className="btn-luxury">
                  Abrir Modal
                </Button>
                <Button onClick={() => setShowConfirmModal(true)} variant="outline">
                  Modal de Confirmação
                </Button>
                <Button onClick={() => handleToastDemo('success')} variant="outline">
                  Toast Sucesso
                </Button>
                <Button onClick={() => handleToastDemo('error')} variant="outline">
                  Toast Erro
                </Button>
                <Button onClick={() => handleToastDemo('warning')} variant="outline">
                  Toast Aviso
                </Button>
                <Button onClick={() => handleToastDemo('info')} variant="outline">
                  Toast Info
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Experimente o Elite Studio"
          subtitle="Transforme a gestão da sua barbearia com nossa plataforma completa"
          buttonText="Começar Teste Gratuito"
          onButtonClick={() => addToast({
            title: 'Teste iniciado!',
            description: 'Bem-vindo ao Elite Studio.',
            variant: 'success'
          })}
        />

        {/* Footer */}
        <Footer />

        {/* Modals */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Modal de Demonstração"
          description="Este é um exemplo de modal responsivo com animações"
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Este modal demonstra o uso de animações suaves, backdrop blur e responsividade.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button className="btn-luxury" onClick={() => setShowModal(false)}>
                Confirmar
              </Button>
            </div>
          </div>
        </Modal>

        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            setShowConfirmModal(false);
            addToast({
              title: 'Ação confirmada!',
              description: 'A operação foi executada com sucesso.',
              variant: 'success'
            });
          }}
          title="Confirmar Ação"
          description="Tem certeza que deseja executar esta ação? Esta operação não pode ser desfeita."
          confirmText="Sim, confirmar"
          cancelText="Cancelar"
        />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="col-span-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-luxury">Dashboard Completo</h1>
            <p className="text-muted-foreground">Visão geral do sistema Elite Studio</p>
          </div>
          <Button onClick={() => setCurrentSection('hero')} variant="outline">
            Voltar ao Início
          </Button>
        </div>

        <StatisticsGrid stats={sampleStats} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="management-card">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aqui seria exibida a atividade recente do sistema.
              </p>
            </CardContent>
          </Card>

          <Card className="management-card">
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Lista dos próximos agendamentos seria exibida aqui.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

const ScaffoldDemoWithProvider: React.FC = () => {
  return (
    <ToastProvider>
      <ScaffoldDemo />
    </ToastProvider>
  );
};

export default ScaffoldDemoWithProvider;
