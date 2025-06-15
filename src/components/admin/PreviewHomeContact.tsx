
import React from 'react';
import ContactSection from '@/components/homepage/ContactSection';
import { HomeContentForm } from '@/utils/validation';
import { useMockData } from '@/contexts/MockDataContext';
import { HomeContent } from '@/data/types';

interface PreviewHomeContactProps {
  data: Partial<HomeContentForm>;
}

const PreviewHomeContact: React.FC<PreviewHomeContactProps> = ({ data }) => {
  const { homeContent: originalHomeContent } = useMockData();

  // Combina os dados originais com os dados do formulário para um preview completo
  const previewHomeContent: HomeContent = {
    ...originalHomeContent,
    contactTitle: data.contactTitle || "Título da Seção de Contato",
    contactSubtitle: data.contactSubtitle || "Subtítulo da Seção de Contato",
    contactPhone: data.contactPhone || "(00) 00000-0000",
    contactEmail: data.contactEmail || "contato@barbearia.com",
    contactAddress: data.contactAddress || "Rua Fictícia, 123",
    workingHours: data.workingHours || "Seg-Sáb: 9h às 18h",
    whatsappMessage: data.whatsappMessage || "Olá! Quero agendar."
  };

  return (
    <div className="bg-background rounded-lg p-4">
      <ContactSection homeContent={previewHomeContent} />
    </div>
  );
};

export default PreviewHomeContact;
