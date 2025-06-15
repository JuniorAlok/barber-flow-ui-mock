
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMockData } from '@/contexts/MockDataContext';
import { useToast } from '@/hooks/use-toast';
import { homeContentSchema, HomeContentForm } from '@/utils/validation';
import HomepageForm from './forms/HomepageForm';
import PreviewHomeHero from './PreviewHomeHero';
import PreviewHomeAbout from './PreviewHomeAbout';
import PreviewHomeServices from './PreviewHomeServices';
import PreviewHomeTeam from './PreviewHomeTeam';
import PreviewHomeContact from './PreviewHomeContact';

const PREVIEW_TITLES: { [key: string]: string } = {
  hero: 'Hero',
  about: 'Sobre',
  services: 'Serviços',
  team: 'Equipe',
  contact: 'Contato',
};

const ConfigurationManagement: React.FC = () => {
  const { homeContent, setHomeContent } = useMockData();
  const { toast } = useToast();
  const [activeFormTab, setActiveFormTab] = useState('hero');

  const form = useForm<HomeContentForm>({
    resolver: zodResolver(homeContentSchema),
    defaultValues: homeContent,
    mode: 'onChange',
  });

  const onSubmit = (data: HomeContentForm) => {
    // Garantir que todos os campos obrigatórios estejam presentes
    const updatedContent = {
      ...homeContent,
      ...data,
    };
    setHomeContent(updatedContent);

    toast({
      title: "Configurações salvas!",
      description: "As alterações na homepage foram aplicadas em tempo real.",
    });
  };

  // Obtem valores do formulário EM TEMPO REAL para passar ao preview
  const formValues = form.watch();

  const renderPreview = () => {
    switch (activeFormTab) {
      case 'hero':
        return <PreviewHomeHero data={formValues} />;
      case 'about':
        return <PreviewHomeAbout data={formValues} />;
      case 'services':
        return <PreviewHomeServices data={formValues} />;
      case 'team':
        return <PreviewHomeTeam data={formValues} />;
      case 'contact':
        return <PreviewHomeContact data={formValues} />;
      default:
        return <PreviewHomeHero data={formValues} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Coluna 1: Formulário */}
      <div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Configurações da Homepage</h2>
          <p className="text-muted-foreground mb-6">
            Edite o conteúdo da homepage. As alterações são aplicadas em tempo real.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo da Homepage</CardTitle>
            <CardDescription>
              Configure os textos e imagens que aparecem na página inicial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HomepageForm
              form={form}
              onSubmit={onSubmit}
              activeTab={activeFormTab}
              onTabChange={setActiveFormTab}
            />
          </CardContent>
        </Card>
      </div>

      {/* Coluna 2: Preview Dinâmico */}
      <div className="hidden lg:block sticky top-24">
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="px-6 py-3 border-b">
            <span className="text-sm font-medium text-muted-foreground capitalize">
              Preview em tempo real: Seção {PREVIEW_TITLES[activeFormTab] || 'Hero'}
            </span>
          </div>
          <div className="p-1 h-[70vh] overflow-y-auto bg-background/50">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationManagement;
