
import React, { useState } from 'react';
import { useMockData } from '@/contexts/MockDataContext';
import { useActiveServices, useActiveBarbers } from '@/hooks/useActiveEntities';
import BookingModal from './BookingModal';
import SimpleHeader from './homepage/SimpleHeader';
import FloatingLoginIcons from './homepage/FloatingLoginIcons';
import HeroSection from './homepage/HeroSection';
import ServicesSection from './homepage/ServicesSection';
import TeamSection from './homepage/TeamSection';
import AboutSection from './homepage/AboutSection';
import ContactSection from './homepage/ContactSection';
import HomepageFooter from './homepage/HomepageFooter';

const HomePage: React.FC = () => {
  const { services, barbers, homeContent } = useMockData();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const activeServices = useActiveServices(services);
  const activeBarbers = useActiveBarbers(barbers);

  const handleBookingOpen = () => setIsBookingModalOpen(true);
  const handleBookingClose = () => setIsBookingModalOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      <FloatingLoginIcons />
      
      <HeroSection 
        title={homeContent.title}
        subtitle={homeContent.subtitle}
        ctaText={homeContent.ctaText}
        onBookingOpen={handleBookingOpen}
      />
      
      <ServicesSection services={activeServices} />
      
      <TeamSection barbers={activeBarbers} />
      
      <AboutSection 
        title={homeContent.aboutTitle}
        description={homeContent.aboutDescription}
      />
      
      <ContactSection homeContent={homeContent} />
      
      <HomepageFooter title={homeContent.title} />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={handleBookingClose} 
      />
    </div>
  );
};

export default HomePage;
