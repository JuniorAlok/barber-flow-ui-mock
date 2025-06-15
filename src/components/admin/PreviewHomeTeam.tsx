
import React from 'react';
import TeamSection from '@/components/homepage/TeamSection';
import { HomeContentForm } from '@/utils/validation';
import { useMockData } from '@/contexts/MockDataContext';

interface PreviewHomeTeamProps {
  data: Partial<HomeContentForm>;
}

const PreviewHomeTeam: React.FC<PreviewHomeTeamProps> = ({ data }) => {
  const { barbers } = useMockData();

  // Mostra apenas 3 barbeiros para o preview
  const previewBarbers = barbers.slice(0, 3);

  return (
    <div className="bg-background rounded-lg p-4">
      <TeamSection
        barbers={previewBarbers}
        title={data.teamTitle}
        subtitle={data.teamSubtitle}
      />
    </div>
  );
};

export default PreviewHomeTeam;
