
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import { HomeContent } from '@/data/types';

interface ContactSectionProps {
  homeContent: HomeContent;
}

const ContactSection: React.FC<ContactSectionProps> = ({ homeContent }) => {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Contato</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-6">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Telefone</h4>
              <p className="text-muted-foreground">{homeContent.contactPhone}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Endereço</h4>
              <p className="text-muted-foreground">{homeContent.contactAddress}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-muted-foreground">{homeContent.contactEmail}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Horários</h4>
              <p className="text-muted-foreground">{homeContent.workingHours}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
