
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMockData } from '@/contexts/MockDataContext';
import { useToast } from '@/hooks/use-toast';
import { homeContentSchema, HomeContentForm } from '@/utils/validation';
import HomepageForm from './forms/HomepageForm';
import PreviewHomeHero from './PreviewHomeHero';

const ConfigurationManagement: React.FC = () => {
  const { homeContent, setHomeContent } = useMockData();
  const { toast } = useToast();

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
            <HomepageForm form={form} onSubmit={onSubmit} />
          </CardContent>
        </Card>
      </div>

      {/* Coluna 2: Preview */}
      <div className="hidden lg:block sticky top-24">
        <div className="rounded-lg border border-neutral-800 bg-neutral-950/85 shadow-xl overflow-hidden">
          <div className="px-6 py-3 border-b border-neutral-800 bg-neutral-900">
            <span className="text-sm font-medium text-muted-foreground">Preview em tempo real</span>
          </div>
          <div className="p-4 bg-neutral-950">
            {/* Usando o componente de preview (apenas a seção Hero para início, pode expandir depois) */}
            <PreviewHomeHero data={formValues} />
            {/* Mais preview de outras seções podem ser adicionados aqui, conforme necessário */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationManagement;
