# FG Vistos - Especialistas em Vistos

## 📋 Descrição

FG Vistos é uma plataforma web moderna e responsiva desenvolvida para oferecer serviços especializados em vistos consulares, autorização eletrônica (ETA) e representação consular. O projeto apresenta uma interface intuitiva e profissional para clientes que buscam assessoria completa em processos de imigração.

## ✨ Funcionalidades

### 🏠 Página Inicial
- **Hero Section**: Apresentação impactante dos serviços
- **Seletor de Vistos**: Interface interativa para escolha de destinos
- **Por que nos escolher**: Diferenciais da empresa
- **Roadmap do Processo**: Etapas claras do serviço
- **Depoimentos**: Testimonials de clientes (opcional)

### 🛂 Página de Vistos
- **Seletor de Serviços**: Vistos, ETA e Representação Consular
- **Vitrine de Destinos**: Apresentação visual dos países
- **Planos Personalizados**: Diferentes opções de serviço
- **FAQ Dinâmico**: Perguntas frequentes por destino

### 📞 Página de Contato
- Formulário de contato completo
- Informações de localização
- Canais de atendimento

### ℹ️ Sobre Nós
- História da empresa
- Missão e valores
- Equipe especializada

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento da aplicação
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes UI modernos
- **Radix UI** - Componentes acessíveis e customizáveis

### Bibliotecas de UI/UX
- **Framer Motion** - Animações fluidas
- **Lucide React** - Ícones modernos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Sonner** - Notificações toast
- **Recharts** - Gráficos e visualizações

### Estado e Dados
- **TanStack Query** - Gerenciamento de estado do servidor
- **React Query** - Cache e sincronização de dados

### Desenvolvimento
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **Autoprefixer** - Prefixos CSS automáticos

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone https://github.com/vinibarbieri/fg-vistos.git
cd fg-vistos
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse a aplicação**
Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Build para produção
npm run build:dev    # Build para desenvolvimento

# Deploy
npm run predeploy    # Executa build antes do deploy
npm run deploy       # Deploy para GitHub Pages

# Qualidade de código
npm run lint         # Executa ESLint
npm run preview      # Preview do build de produção
```

## 🏗️ Estrutura do Projeto

```
fg-vistos/
├── public/                 # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens e recursos
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes base (shadcn/ui)
│   │   ├── Navbar.tsx    # Navegação principal
│   │   ├── Hero.tsx      # Seção hero
│   │   ├── VisaSelector.tsx # Seletor de vistos
│   │   └── ...           # Outros componentes
│   ├── pages/            # Páginas da aplicação
│   │   ├── Index.tsx     # Página inicial
│   │   ├── Vistos.tsx    # Página de vistos
│   │   ├── Contato.tsx   # Página de contato
│   │   └── ...           # Outras páginas
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilitários e configurações
│   ├── cn/               # Utilitários de classes CSS
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Ponto de entrada
├── dist/                 # Build de produção
├── package.json          # Dependências e scripts
├── vite.config.ts        # Configuração do Vite
├── tailwind.config.ts    # Configuração do Tailwind
└── tsconfig.json         # Configuração do TypeScript
```

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:

- **Cores**: Paleta personalizada com cores primárias e secundárias
- **Tipografia**: Fonte Poppins para melhor legibilidade
- **Componentes**: Sistema de componentes reutilizáveis com shadcn/ui
- **Responsividade**: Design mobile-first com breakpoints otimizados
- **Acessibilidade**: Componentes acessíveis seguindo padrões WCAG

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:
- 📱 Dispositivos móveis
- 📱 Tablets
- 💻 Desktops
- 🖥️ Telas grandes

## 🔧 Configuração de Deploy

O projeto está configurado para deploy automático no GitHub Pages:

1. **Build de produção**
```bash
npm run build
```

2. **Deploy automático**
```bash
npm run deploy
```

## 📄 Licença

Este projeto é privado e desenvolvido para FG Vistos.

## 👥 Equipe

- **Desenvolvimento**: Vini Barbieri
- **Design**: FG Vistos
- **Conteúdo**: FG Vistos

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o projeto, entre em contato através dos canais oficiais da FG Vistos.

---

**FG Vistos** - Especialistas em vistos consulares, autorização eletrônica e representação consular.
