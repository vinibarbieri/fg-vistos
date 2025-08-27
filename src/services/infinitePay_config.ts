// src/config/infinitePay.ts

export const INFINITEPAY_CONFIG = {
  // Handle do InfinitePay (sua identificação única)
  HANDLE: import.meta.env.VITE_INFINITEPAY_HANDLE || 'seu_handle_aqui',
  
  // URLs da API
  API_BASE_URL: 'https://api.infinitepay.io',
  
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
    URL: '/api/webhooks/infinitepay',
    TIMEOUT: 1000, // 1 segundo para resposta
  },
  
  // Configurações de pagamento
  PAYMENT: {
    CURRENCY: 'BRL',
    MIN_AMOUNT: 300000, // R$ 300 em centavos
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
  },
  
  // Configurações de retry
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // 1 segundo
  },
} as const;

// Validação da configuração
export const validateInfinitePayConfig = () => {
  const errors: string[] = [];
  
  if (!INFINITEPAY_CONFIG.HANDLE || INFINITEPAY_CONFIG.HANDLE === 'seu_handle_aqui') {
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
