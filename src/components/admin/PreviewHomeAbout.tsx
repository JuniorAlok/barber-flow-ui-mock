
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

  // Mock barbers doesn't affect the preview, just the about fields
  // AboutSection will eagerly use useMockData for features, but here the goal is to preview titles/descriptions from the form

  // To override useMockData context in AboutSection preview, would need more context work;
  // for now, preview main title/description is enough for client validation
  return (
    <div className="rounded-xl border border-primary/10 bg-background shadow-inner overflow-hidden p-4 max-w-lg mx-auto mt-8" style={{ minHeight: 340, background: "#161922" }}>
      <AboutSection 
        title={aboutTitle}
        description={aboutDescription}
      />
    </div>
  );
};

export default PreviewHomeAbout;
