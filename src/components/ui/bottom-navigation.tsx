
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Scissors, BarChart3, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavItem {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, isActive, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
      isActive 
        ? "text-yellow-500 bg-yellow-500/10" 
        : "text-gray-400 hover:text-white active:bg-yellow-700/20"
    )}
  >
    <div className="w-6 h-6 mb-1">
      {icon}
    </div>
    <span className="text-xs font-medium">{label}</span>
  </motion.button>
);

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  className?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange,
  className 
}) => {
  const navItems: (BottomNavItem & { key: string })[] = [
    {
      key: 'bookings',
      icon: <Calendar className="w-full h-full" />,
      label: 'Agd',
      isActive: activeTab === 'bookings',
      onClick: () => onTabChange?.('bookings')
    },
    {
      key: 'services',
      icon: <Scissors className="w-full h-full" />,
      label: 'Serv',
      isActive: activeTab === 'services',
      onClick: () => onTabChange?.('services')
    },
    {
      key: 'dashboard',
      icon: <BarChart3 className="w-full h-full" />,
      label: 'Dash',
      isActive: activeTab === 'dashboard',
      onClick: () => onTabChange?.('dashboard')
    },
    {
      key: 'profile',
      icon: <User className="w-full h-full" />,
      label: 'Perfil',
      isActive: activeTab === 'profile',
      onClick: () => onTabChange?.('profile')
    }
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed bottom-0 inset-x-0 bg-black/95 backdrop-blur-sm border-t border-yellow-800/30 p-2 flex justify-around shadow-lg md:hidden z-50",
        className
      )}
    >
      {navItems.map((item) => (
        <IconButton
          key={item.key}
          icon={item.icon}
          label={item.label}
          isActive={item.isActive}
          onClick={item.onClick}
        />
      ))}
    </motion.div>
  );
};

export default BottomNavigation;
