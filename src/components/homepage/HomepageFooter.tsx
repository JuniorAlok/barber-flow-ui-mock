
import React from 'react';

interface HomepageFooterProps {
  title: string;
}

const HomepageFooter: React.FC<HomepageFooterProps> = ({ title }) => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 {title}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default HomepageFooter;
