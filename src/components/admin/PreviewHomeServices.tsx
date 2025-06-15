
import React from 'react';
import ServicesSection from '@/components/homepage/ServicesSection';
import { HomeContentForm } from '@/utils/validation';
import { useMockData } from '@/contexts/MockDataContext';

interface PreviewHomeServicesProps {
  data: Partial<HomeContentForm>;
}

const PreviewHomeServices: React.FC<PreviewHomeServicesProps> = ({ data }) => {
  const { services } = useMockData();

  // Mostra apenas 3 serviços para um preview mais limpo
  const previewServices = services.slice(0, 3);

  return (
    <div className="bg-background rounded-lg p-4">
      <ServicesSection
        services={previewServices}
        title={data.servicesTitle}
        subtitle={data.servicesSubtitle}
      />
    </div>
  );
};

export default PreviewHomeServices;
