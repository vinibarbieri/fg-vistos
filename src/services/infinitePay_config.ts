// src/config/infinitePay.ts

// Configuração base para diferentes ambientes
const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    // Em desenvolvimento, usa proxy local para evitar CORS
    return '/api/site-backend';
  }
  
  if (import.meta.env.MODE === 'staging') {
    // Em staging, pode usar uma URL diferente
    return 'https://api.infinitepay.io';
  }
  
  // Em produção, usa a URL oficial
  return 'https://api.infinitepay.io';
};

export const INFINITEPAY_CONFIG = {
  // Handle do InfinitePay (sua identificação única)
  HANDLE: import.meta.env.VITE_INFINITEPAY_HANDLE || '$fgvistos',
  
  // URLs da API - Configuração dinâmica baseada no ambiente
  API_BASE_URL: getApiBaseUrl(),
  
  // Endpoints
  ENDPOINTS: {
    CREATE_CHECKOUT: '/invoices/public/checkout/links',
    CHECK_PAYMENT: '/invoices/public/checkout/payment_check',
  },
  
  // URLs de redirecionamento
  REDIRECT_URLS: {
    SUCCESS: '/payment-success',
    FAILED: '/payment-success?status=failed',
    ERROR: '/payment-success?status=error',
  },
  
  // Configurações de webhook
  WEBHOOK: {
    URL: '/api/site-backend/webhooks/infinitepay',
    TIMEOUT: 1000, // 1 segundo para resposta
  },
  
  // Configurações de pagamento
  PAYMENT: {
    CURRENCY: 'BRL',
    MIN_AMOUNT: 30000, // R$ 300 em centavos
    MAX_AMOUNT: 1000000, // R$ 10.000,00 em centavos
  },
  
  // Status de pagamento
  PAYMENT_STATUS: {
    PENDING: 'pending',
    CHECKOUT_CREATED: 'checkout_created',
    PAID: 'paid',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  
  // Métodos de captura
  CAPTURE_METHODS: {
    CREDIT_CARD: 'credit_card',
    PIX: 'pix',
  },
  
  // Mensagens de erro
  ERROR_MESSAGES: {
    INVALID_HANDLE: 'Handle do InfinitePay inválido. Verifique a configuração.',
    NETWORK_ERROR: 'Erro de conexão com o InfinitePay. Tente novamente.',
    INVALID_DATA: 'Dados inválidos para criar o checkout.',
    PAYMENT_FAILED: 'Pagamento não foi aprovado. Tente novamente.',
    ORDER_NOT_FOUND: 'Pedido não encontrado.',
    CORS_ERROR: 'Erro de CORS detectado. Verifique a configuração do proxy.',
  },
  
  // Configurações de retry
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // 1 segundo
  },
  
  // Configurações de ambiente
  ENV: {
    IS_DEV: import.meta.env.DEV,
    IS_PROD: import.meta.env.PROD,
    MODE: import.meta.env.MODE,
  },
} as const;

// Validação da configuração
export const validateInfinitePayConfig = () => {
  const errors: string[] = [];
  
  if (!INFINITEPAY_CONFIG.HANDLE || INFINITEPAY_CONFIG.HANDLE === '$fgvistos') {
    errors.push('VITE_INFINITEPAY_HANDLE não está configurado corretamente');
  }
  
  if (errors.length > 0) {
    console.error('Erros na configuração do InfinitePay:', errors);
    return false;
  }
  
  return true;
};

// Helper para formatar preços
export const formatPrice = (price: number, currency: string = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(price);
};

// Helper para converter reais para centavos
export const convertToCents = (price: number): number => {
  return Math.round(price * 100);
};

// Helper para converter centavos para reais
export const convertFromCents = (cents: number): number => {
  return cents / 100;
};

export default INFINITEPAY_CONFIG;
