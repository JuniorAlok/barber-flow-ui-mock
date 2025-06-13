
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href?: string;
  description?: string;
  items?: NavItem[];
  icon?: React.ComponentType<{ className?: string }>;
}

interface ModernNavProps {
  items: NavItem[];
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'transparent' | 'solid';
}

const ModernNav: React.FC<ModernNavProps> = ({
  items,
  logo,
  actions,
  className,
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getNavVariant = () => {
    switch (variant) {
      case 'transparent':
        return 'bg-transparent backdrop-blur-md border-b border-white/10';
      case 'solid':
        return 'bg-card border-b border-border';
      default:
        return 'glass-effect-strong border-b border-white/10';
    }
  };

  const NavLink = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    );
  });
  NavLink.displayName = "NavLink";

  const renderDesktopNav = () => (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {items.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.items ? (
              <>
                <NavigationMenuTrigger className="nav-link">
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <NavigationMenuLink asChild>
                          <NavLink
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href={subItem.href}
                            title={subItem.title}
                          >
                            {subItem.description}
                          </NavLink>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                className="nav-link"
                href={item.href}
              >
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.title}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  const renderMobileNav = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" className="text-foreground">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] glass-effect-strong border-r border-white/10">
        <div className="space-y-4 py-4">
          {logo && <div className="px-3 py-2">{logo}</div>}
          <nav className="space-y-2">
            {items.map((item, index) => (
              <div key={index}>
                {item.items ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-3 py-2 text-sm font-medium">
                      <span className="flex items-center">
                        {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                        {item.title}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                    <div className="ml-4 space-y-1">
                      {item.items.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    {item.title}
                  </a>
                )}
              </div>
            ))}
          </nav>
          {actions && (
            <div className="px-3 pt-4 border-t border-border">
              {actions}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-200',
      getNavVariant(),
      className
    )}>
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            {renderMobileNav()}
            {logo}
          </div>

          {/* Desktop Navigation */}
          {renderDesktopNav()}

          {/* Actions */}
          {actions && (
            <div className="hidden lg:flex items-center space-x-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ModernNav;
