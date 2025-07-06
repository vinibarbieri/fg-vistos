import { 
  Globe, 
  CheckCircle, 
  Shield, 
  HelpCircle, 
  FileText, 
  Clock, 
  Phone, 
  Home, 
  Info, 
  MessageCircle, 
  Briefcase, 
  BookOpen 
} from 'lucide-react';
import { useMemo } from 'react';

// Mapeamento de nomes para componentes de ícones
const iconMap = {
  Globe,
  CheckCircle,
  Shield,
  HelpCircle,
  FileText,
  Clock,
  Phone,
  Home,
  Info,
  MessageCircle,
  Briefcase,
  BookOpen
};

export const useMenuIcons = () => {
  const getIconComponent = useMemo(() => {
    return (iconName: string, className: string = "h-5 w-5 shrink-0") => {
      const IconComponent = iconMap[iconName as keyof typeof iconMap];
      if (!IconComponent) {
        console.warn(`Ícone não encontrado: ${iconName}`);
        return null;
      }
      return <IconComponent className={className} />;
    };
  }, []);

  return { getIconComponent };
}; 