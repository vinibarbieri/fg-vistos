import { Logo } from '@/assets/images';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cnMainMenu, MenuItem, getIconByName } from '@/cn';
import { useMenuIcons } from '@/hooks/useMenuIcons';

// Types
interface MenuItemWithIcon extends MenuItem {
  icon?: JSX.Element;
}

interface MobileSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  services: Array<{ name: string; href: string }>;
}



// Components
const MobileMenuItem = ({ 
  item, 
  onClose,
  getIconComponent
}: { 
  item: MenuItem; 
  onClose: () => void;
  getIconComponent: (iconName: string, className?: string) => JSX.Element | null;
}) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="flex items-center gap-3 px-2 py-3 text-lg font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors hover:no-underline">
          <div className="flex items-center gap-3">
            {item.iconName && getIconComponent(item.iconName)}
            <span className="text-lg font-medium">{item.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <div className="space-y-2">
            {item.items.map((subItem) => (
              <MobileSubMenuItem 
                key={subItem.title} 
                item={subItem} 
                onClose={onClose}
                getIconComponent={getIconComponent}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link 
      to={item.url} 
      className="flex items-center gap-3 px-2 py-3 text-lg font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
      onClick={onClose}
    >
      {item.iconName && getIconComponent(item.iconName)}
      {item.title}
    </Link>
  );
};

const MobileSubMenuItem = ({ 
  item, 
  onClose,
  getIconComponent
}: { 
  item: MenuItem; 
  onClose: () => void;
  getIconComponent: (iconName: string, className?: string) => JSX.Element | null;
}) => (
  <Link
    className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-gray-50 hover:text-primary"
    to={item.url}
    onClick={onClose}
  >
    {getIconComponent(getIconByName(item.title) || 'HelpCircle')}
    <div className="flex-1">
      <div className="text-sm font-semibold">
        {item.title}
      </div>
      {item.description && (
        <p className="text-sm leading-snug text-gray-500 mt-1">
          {item.description}
        </p>
      )}
    </div>
  </Link>
);

const MobileSidebarHeader = () => (
  <SheetHeader>
    <div className="flex items-center justify-between">
      <SheetTitle className="flex items-center gap-4">
        <img 
          src={Logo} 
          alt="FG Vistos"
          className="h-8 w-auto"
        />
        <span>FG Vistos</span>
      </SheetTitle>
    </div>
  </SheetHeader>
);

const MobileSidebarMenu = ({ onClose }: { onClose: () => void }) => {
  const { getIconComponent } = useMenuIcons();
  
  return (
    <div className="flex flex-col gap-4 mt-10">
      <Accordion
        type="single"
        collapsible
        className="flex w-full flex-col gap-4"
      >
        {cnMainMenu.map((item) => (
          <MobileMenuItem 
            key={item.title} 
            item={item} 
            onClose={onClose}
            getIconComponent={getIconComponent}
          />
        ))}
      </Accordion>
    </div>
  );
};

const MobileSidebarFooter = ({ onClose }: { onClose: () => void }) => (
  <div className="mt-auto pt-10 border-t">
    <Button 
      size="lg" 
      className="w-full bg-primary hover:bg-primary/90 text-lg"
      onClick={onClose}
    >
      <User className="mr-2 h-4 w-4" />
      Meu Processo
    </Button>
  </div>
);

// Main Component
const MobileSidebar = ({ isOpen, onOpenChange, services }: MobileSidebarProps) => {
  const closeMobileMenu = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="w-[300px] sm:w-[400px] [&>button]:hidden overflow-y-auto"
      >
        <MobileSidebarHeader />
        <MobileSidebarMenu onClose={closeMobileMenu} />
        <MobileSidebarFooter onClose={closeMobileMenu} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar; 