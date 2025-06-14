
import React from 'react';
import HeroSection from '@/components/homepage/HeroSection';
import { HomeContentForm } from '@/utils/validation';

// Prop: data = objeto vindo de form.watch()
// Reaproveita o componente HeroSection da home para mostrar como ficará a hero banner.
interface PreviewHomeHeroProps {
  data: Partial<HomeContentForm>;
}

const PreviewHomeHero: React.FC<PreviewHomeHeroProps> = ({ data }) => {
  // Fallback para strings em branco/campos não preenchidos
  const {
    title = "Título de Exemplo",
    subtitle = "Subtítulo de exemplo para a sessão hero.",
    ctaText = "Chamada para ação",
    heroFeature1 = "Recurso 1",
    heroFeature2 = "Recurso 2",
    heroFeature3 = "Recurso 3",
    heroImageUrl = "",
  } = data || {};

  // Preencher objeto para HeroSection conforme o esperado
  const previewContent: any = {
    title,
    subtitle,
    ctaText,
    onBookingOpen: () => {}, // Preview não realiza ação real
    // A seção HeroSection acessa heroFeature* através do context, então passaremos via context se necessário.
    heroFeature1,
    heroFeature2,
    heroFeature3,
    heroImageUrl,
  };

  // DICA IMPORTANTE: Como HeroSection usa useMockData para pegar mais dados, 
  // se quiser preview custom abrangendo outras seções, pode ser necessário um contexto custom, 
  // mas para preview, props simples já resolvem para HeroSection.

  // Usar CSS scale-down para simular uma visualização em miniatura/tablet/mobile, se quiser.
  return (
    <div className="rounded-xl border border-primary/10 bg-background shadow-inner overflow-hidden p-4 max-w-lg mx-auto" style={{ minHeight: 380, background: "#15181e" }}>
      {/* Render 👇 Visualização HeroSection (props injetadas) */}
      <HeroSection
        title={previewContent.title}
        subtitle={previewContent.subtitle}
        ctaText={previewContent.ctaText}
        onBookingOpen={() => {}}
      />
    </div>
  );
};

export default PreviewHomeHero;
