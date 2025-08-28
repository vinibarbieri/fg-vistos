# FG Vistos - Site Oficial da Agência de Vistos

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)

**Site oficial da agência com arquitetura moderna, integração de pagamentos e interface responsiva**

[🌐 Site Demo](https://vinibarbieri.github.io/fg-vistos/) • [📊 Plataforma de Gestão FG Vistos](https://github.com/vinibarbieri/fg-vistos-app)

</div>

---

## 🎯 **Sobre o Projeto**

**FG Vistos** é o site oficial da agência de vistos FG Visto, desenvolvido como uma solução completa e personalizada que inclui:

- **Frontend React** com interface moderna e responsiva
- **Backend Node.js** com API REST robusta
- **Sistema de pagamentos** integrado com InfinitePay
- **Banco de dados** PostgreSQL via Supabase
- **Autenticação JWT** e gestão de usuários
- **Integração com Plataforma de gestão** para acompanhamento de processo do visto

### ✨ **Funcionalidades do Site**

- 🛂 **Seletor de Vistos Inteligente** - Interface interativa para escolha de destinos
- 🌍 **Vitrine de Países** - Apresentação visual dos destinos oferecidos pela agência
- 💳 **Sistema de Pagamentos** - Integração completa com gateway de pagamento
- 📱 **Design Responsivo** - Funciona perfeitamente em todos os dispositivos
- 🔐 **Gestão de Usuários** - Sistema de registro e autenticação para clientes

---

## 🚀 **Tecnologias Utilizadas**

### **Frontend**
- **React 18.3.1** - Biblioteca principal com hooks modernos
- **TypeScript 5.5.3** - Tipagem estática para código robusto
- **Vite 5.4.1** - Build tool ultra-rápido
- **Tailwind CSS 3.4.11** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e customizáveis
- **Framer Motion** - Animações fluidas e interativas
- **React Hook Form** - Gerenciamento de formulários
- **React Query** - Gerenciamento de estado do servidor

### **Backend**
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **TypeScript** - Tipagem estática
- **JWT** - Autenticação segura
- **Zod** - Validação de dados
- **Helmet** - Headers de segurança

### **Banco de Dados & Infraestrutura**
- **Supabase** - Backend-as-a-Service com PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **InfinitePay** - Gateway de pagamentos

### **Ferramentas de Desenvolvimento**
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **GitHub Pages** - Deploy automático

---

## 🏗️ **Arquitetura do Sistema**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   React + TS    │◄──►│   Node.js       │◄──►│   Supabase      │
│   Vite + Tailwind│    │   Express       │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   InfinitePay   │    │   JWT Auth      │    │   File Storage  │
│   Gateway       │    │   Validation    │    │   & CDN         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Estrutura de Pastas**
```
src/
├── components/          # Componentes React reutilizáveis
│   ├── ui/             # Componentes base (Radix UI)
│   ├── VisaSelector.tsx # Seletor principal de vistos
│   ├── Checkout.tsx    # Sistema de pagamento
│   └── ...
├── pages/              # Páginas da aplicação
├── services/           # Serviços externos (API, pagamentos)
├── hooks/              # Custom hooks React
├── types/              # Definições TypeScript
└── utils/              # Funções utilitárias
```

---

## 🚀 **Como Executar o Projeto**

### **Pré-requisitos**
- Node.js 18+ 
- Yarn ou npm
- Conta no Supabase
- Conta no InfinitePay

### **Instalação Frontend**
```bash
# Clonar o repositório
git clone https://github.com/vinibarbieri/fg-vistos.git
cd fg-vistos

# Instalar dependências
yarn install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Executar em desenvolvimento
yarn dev

# Build para produção
yarn build
```

> **⚠️ Importante:** O backend ainda não está hospedado em produção. Para testar todas as funcionalidades da demo, é necessário executar o backend localmente seguindo as instruções abaixo.

### **Instalação Backend**
```bash
cd backend
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar
npm run dev
```

---

## 💡 **Características do Site**

### **1. Seletor de Vistos Personalizado**
- **Seleção dinâmica** dos países atendidos pela agência
- **Cálculo automático** de preços e taxas específicos
- **Validação em tempo real** de formulários
- **Integração direta** com sistema de pagamentos

### **2. Sistema de Pagamentos Integrado**
- **Integração nativa** com InfinitePay para a agência
- **Suporte a PIX e cartão** de crédito
- **Webhooks seguros** para confirmação de pagamentos
- **Gestão de status** em tempo real

### **3. Arquitetura Profissional**
- **Separação clara** entre frontend e backend
- **API REST** bem estruturada para a operação da agência
- **Middleware de segurança** (JWT, rate limiting)
- **Validação de dados** com Zod

### **4. Interface Moderna e Responsiva**
- **Design system** consistente com Radix UI
- **Animações fluidas** com Framer Motion
- **Responsividade completa** para mobile
- **Experiência do usuário** otimizada para clientes da agência

---

## 📱 **Demonstração**

- **Site Demo**: [https://vinibarbieri.github.io/fg-vistos/](https://vinibarbieri.github.io/fg-vistos/)
- **Repositório**: [GitHub](https://github.com/vinibarbieri/fg-vistos)

> **📝 Nota:** O site online mostra apenas o frontend. Para testar funcionalidades completas (pagamentos, banco de dados, etc.), execute o backend localmente conforme as instruções de instalação.

---

## 📞 **Contato**

- **Desenvolvedor**: Vinicius Barbieri
- **Email**: vinibarbieri.dev@gmail.com
- **LinkedIn**: [Vinicius De Paola Barbieri](linkedin.com/in/vinibarbieri)
- **GitHub**: [@vinibarbieri](https://github.com/vinibarbieri)

---
