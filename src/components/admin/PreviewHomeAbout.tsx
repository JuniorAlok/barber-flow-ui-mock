import React from 'react';
import AboutSection from '@/components/homepage/AboutSection';
import { HomeContentForm } from '@/utils/validation';

// Accept the form's "watch" data for previewing the About section
interface PreviewHomeAboutProps {
  data: Partial<HomeContentForm>;
}

const PreviewHomeAbout: React.FC<PreviewHomeAboutProps> = ({ data }) => {
  // Provide fallbacks for missing inputs
  const {
    aboutTitle = "Título da seção Sobre",
    aboutDescription = "Descrição de exemplo. Conte a história da sua barbearia, destaque diferenciais ou valores.",
    aboutFeature1Title = "Tradição e Qualidade",
    aboutFeature1Description = "Mantemos as melhores técnicas tradicionais combinadas com inovação.",
    aboutFeature2Title = "Excelência no Atendimento",
    aboutFeature2Description = "Atendimento premium para cada cliente.",
    aboutFeature3Title = "Compromisso com o Tempo",
    aboutFeature3Description = "Agilidade e precisão no seu atendimento.",
  } = data || {};

  return (
    <div className="rounded-xl border p-4 max-w-lg mx-auto mt-8">
      <AboutSection 
        title={aboutTitle}
        description={aboutDescription}
      />
    </div>
  );
};

export default PreviewHomeAbout;
