
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, Clock, Star } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import BookingModal from './BookingModal';

const HomePage: React.FC = () => {
  const { services, barbers, homeContent } = useMockData();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">{homeContent.title}</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Serviços</a>
            <a href="#team" className="text-foreground hover:text-primary transition-colors">Equipe</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">Sobre</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contato</a>
          </nav>
          <Button 
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            {homeContent.ctaText}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {homeContent.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {homeContent.subtitle}
          </p>
          <Button 
            size="lg" 
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 animate-pulse"
          >
            {homeContent.ctaText}
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  {service.imageUrl && (
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{service.duration} min</span>
                    <span className="text-lg font-bold text-primary">R$ {service.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {barbers.map((barber) => (
              <Card key={barber.id} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <img 
                    src={barber.avatarUrl} 
                    alt={barber.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="text-xl font-semibold mb-2">{barber.name}</h4>
                  <p className="text-primary font-medium mb-2">{barber.specialization}</p>
                  <p className="text-muted-foreground text-sm mb-3">{barber.experience}</p>
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{barber.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">{homeContent.aboutTitle}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {homeContent.aboutDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Contato</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Telefone</h4>
                <p className="text-muted-foreground">(11) 99999-9999</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Endereço</h4>
                <p className="text-muted-foreground">Rua da Barbearia, 123<br />São Paulo, SP</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Horários</h4>
                <p className="text-muted-foreground">Seg-Sáb: 9h às 18h<br />Dom: Fechado</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 {homeContent.title}. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
};

export default HomePage;
