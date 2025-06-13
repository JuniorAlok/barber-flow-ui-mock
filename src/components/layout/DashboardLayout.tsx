
/**
 * Dashboard Layout Component
 * Provides a fixed sidebar, header with profile/notifications, and main content grid
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className
}) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-64 glass-effect-strong border-r border-border/50">
        <DashboardSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <header className="glass-effect-strong border-b border-border/50 sticky top-0 z-20">
          <DashboardHeader />
        </header>

        {/* Main Content */}
        <main className={cn(
          "container-responsive py-6",
          "grid grid-cols-12 gap-6",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

/**
 * Dashboard Sidebar Component
 * Fixed navigation menu with glass effect
 */
const DashboardSidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', href: '/' },
    { label: 'Analytics', icon: 'analytics', href: '/analytics' },
    { label: 'Settings', icon: 'settings', href: '/settings' },
  ];

  return (
    <div className="flex flex-col h-full p-6">
      <div className="mb-8">
        <h2 className="text-luxury text-xl font-bold">Elite Studio</h2>
        <p className="text-muted-foreground text-sm">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item, index) => (
          <motion.a
            key={item.label}
            href={item.href}
            className="nav-link w-full justify-start"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {item.label}
          </motion.a>
        ))}
      </nav>
    </div>
  );
};

/**
 * Dashboard Header Component
 * Contains profile and notifications
 */
const DashboardHeader: React.FC = () => {
  return (
    <div className="container-responsive flex items-center justify-between py-4">
      <div>
        <h1 className="text-2xl font-bold text-luxury">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your dashboard</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3 glass-effect px-4 py-2 rounded-lg">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-accent-foreground" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Admin User</p>
            <p className="text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
