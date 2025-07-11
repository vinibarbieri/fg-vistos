// Tipos para os dados do menu
export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  iconName?: string; // Nome do ícone do lucide-react
  items?: MenuItem[];
}

// Dados do menu de serviços
export const cnServicesMenu: Omit<MenuItem, 'iconName'>[] = [
  {
    title: 'Vistos',
    description: 'Processamento completo de vistos para diversos países',
    url: '/vistos'
  },
  {
    title: 'Autorização Eletrônica (ETA)',
    description: 'Autorizações eletrônicas para viagens rápidas',
    url: '/vistos'
  },
  {
    title: 'Representação Consular',
    description: 'Serviços de representação em consulados',
    url: '/vistos'
  },
  {
    title: 'Consultoria Especializada',
    description: 'Orientações personalizadas para seu processo',
    url: '/vistos'
  }
];

// Dados do menu de recursos
export const cnResourcesMenu: Omit<MenuItem, 'iconName'>[] = [
  {
    title: 'Documentação Necessária',
    description: 'Lista completa de documentos para cada tipo de visto',
    url: '/documentacao'
  },
  {
    title: 'Prazos de Processamento',
    description: 'Informações sobre tempo de análise dos processos',
    url: '/prazos'
  },
  {
    title: 'FAQ',
    description: 'Perguntas frequentes sobre vistos e processos',
    url: '/faq'
  },
  {
    title: 'Suporte',
    description: 'Entre em contato conosco para tirar suas dúvidas',
    url: '/contato'
  }
];

// Dados completos do menu principal
export const cnMainMenu: MenuItem[] = [
  { 
    title: "Home", 
    url: "/", 
    iconName: "Home"
  },
  {
    title: "Serviços",
    url: "#",
    iconName: "Briefcase",
    items: cnServicesMenu
  },
  // {
  //   title: "Recursos",
  //   url: "#",
  //   iconName: "BookOpen",
  //   items: cnResourcesMenu
  // },
  { 
    title: "Sobre Nós", 
    url: "/sobre-nos", 
    iconName: "Info"
  },
  { 
    title: "Contato", 
    url: "/contato", 
    iconName: "MessageCircle"
  }
];

// Mapeamento de ícones para serviços
export const cnServiceIcons: Record<string, string> = {
  'Vistos': 'Globe',
  'Autorização Eletrônica (ETA)': 'CheckCircle',
  'Representação Consular': 'Shield',
  'Consultoria Especializada': 'HelpCircle'
};

// Mapeamento de ícones para recursos
export const cnResourceIcons: Record<string, string> = {
  'Documentação Necessária': 'FileText',
  'Prazos de Processamento': 'Clock',
  'FAQ': 'HelpCircle',
  'Suporte': 'Phone'
};

// Função utilitária para obter ícone por título
export const getIconByName = (title: string): string | undefined => {
  return cnServiceIcons[title] || cnResourceIcons[title];
};

// Função utilitária para obter item do menu por título
export const getMenuItemByTitle = (title: string): MenuItem | undefined => {
  return cnMainMenu.find(item => item.title === title);
};

// Função utilitária para obter subitens de um menu
export const getSubItems = (menuTitle: string): MenuItem[] | undefined => {
  const menuItem = getMenuItemByTitle(menuTitle);
  return menuItem?.items;
};

// Função utilitária para verificar se um item tem subitens
export const hasSubItems = (title: string): boolean => {
  const menuItem = getMenuItemByTitle(title);
  return Boolean(menuItem?.items && menuItem.items.length > 0);
}; 