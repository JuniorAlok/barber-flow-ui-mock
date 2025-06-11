
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMockData } from '@/contexts/MockDataContext';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { homeContentSchema, HomeContentForm } from '@/utils/validation';
import HomepageForm from './forms/HomepageForm';

const ConfigurationManagement: React.FC = () => {
  const { homeContent, setHomeContent } = useMockData();
  const { toast } = useToast();

  const form = useForm<HomeContentForm>({
    resolver: zodResolver(homeContentSchema),
    defaultValues: homeContent,
  });

  const onSubmit = (data: HomeContentForm) => {
    console.log('Salvando configurações:', data);
    
    // Ensure all required fields are present by merging with current homeContent
    const updatedContent = {
      title: data.title || homeContent.title,
      subtitle: data.subtitle || homeContent.subtitle,
      ctaText: data.ctaText || homeContent.ctaText,
      aboutTitle: data.aboutTitle || homeContent.aboutTitle,
      aboutDescription: data.aboutDescription || homeContent.aboutDescription,
      heroImageUrl: data.heroImageUrl || homeContent.heroImageUrl,
      contactPhone: data.contactPhone || homeContent.contactPhone,
      contactAddress: data.contactAddress || homeContent.contactAddress,
      contactEmail: data.contactEmail || homeContent.contactEmail,
      workingHours: data.workingHours || homeContent.workingHours,
    };
    
    setHomeContent(updatedContent);
    
    toast({
      title: "Configurações salvas!",
      description: "As alterações na homepage foram aplicadas em tempo real.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Configurações da Homepage</h2>
        <p className="text-muted-foreground">
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
  );
};

export default ConfigurationManagement;
