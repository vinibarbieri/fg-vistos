import { Logo } from '@/assets/images';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import MobileSidebar from './MobileSidebar';
import useScrollDirection from '@/hooks/useScrollDirection';
import { cnMainMenu, MenuItem, getIconByName } from '@/cn';
import { useMenuIcons } from '@/hooks/useMenuIcons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const { getIconComponent } = useMenuIcons();

  // Dados para o MobileSidebar (mantendo compatibilidade)
  const mobileServices = [
    { name: 'Vistos', href: '/vistos' },
    { name: 'Autorização Eletrônica (ETA)', href: '/vistos' },
    { name: 'Representação Consular', href: '/vistos' },
    { name: 'Consultoria Especializada', href: '/vistos' }
  ];

  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title} className="text-gray-700">
          <NavigationMenuTrigger className="text-md hover:font-semibold">{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-80 p-3">
              <NavigationMenuLink>
                {item.items.map((subItem) => (
                  <li key={subItem.title}>
                    <Link
                      className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                      to={subItem.url}
                    >
                      {getIconComponent(getIconByName(subItem.title) || 'HelpCircle')}
                      <div>
                        <div className="text-sm font-semibold">
                          {subItem.title}
                        </div>
                        {subItem.description && (
                          <p className="text-sm leading-snug text-muted-foreground">
                            {subItem.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </NavigationMenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <Link
        key={item.title}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-md font-medium text-gray-700 transition-colors hover:bg-muted hover:text-accent-foreground hover:font-semibold"
        to={item.url}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <nav className={`bg-white shadow-sm border-b sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
      scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Sidebar - Left */}
          <div className="md:hidden">
            <MobileSidebar 
              isOpen={isMobileMenuOpen}
              onOpenChange={setIsMobileMenuOpen}
              services={mobileServices}
            />
          </div>

          {/* Logo - Center on mobile, Left on desktop */}
          <div className="flex items-center">
            <Link to="/" className="flex justify-center md:justify-start w-full">
              <img 
                src={Logo} 
                alt="FG Vistos"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8 text-md">
            <NavigationMenu>
              <NavigationMenuList>
                {cnMainMenu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side - Login Button */}
          <div className="flex items-center space-x-4">
            {/* Desktop - Meu Processo Button */}
            <Button size="sm" className="bg-primary hover:bg-primary/90 hidden md:flex">
              <User className="mr-2 h-4 w-4" />
              Meu Processo
            </Button>
            
            {/* Mobile - Login Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden bg-primary hover:bg-primary/90 rounded-full"
              onClick={() => {
                // TODO: Implementar login
                console.log('Login clicked');
              }}
            >
              <User className="h-5 w-5 text-white" />
              <span className="sr-only">Fazer login</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
