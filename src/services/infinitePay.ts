// src/services/infinitePay.ts
import { INFINITEPAY_CONFIG, validateInfinitePayConfig } from '@/services/infinitePay_config';

export interface InfinitePayItem {
  quantity: number;
  price: number; // Preço em centavos
  description: string;
}

export interface InfinitePayCustomer {
  name: string;
  email: string;
  phone_number?: string;
}

export interface InfinitePayAddress {
  cep: string;
  number: string;
  complement?: string;
}

export interface CreateCheckoutLinkRequest {
  handle: string;
  redirect_url: string;
  webhook_url?: string;
  order_nsu: string;
  customer?: InfinitePayCustomer;
  address?: InfinitePayAddress;
  items: InfinitePayItem[];
}

export interface CreateCheckoutLinkResponse {
  url: string;
}

export interface PaymentCheckRequest {
  handle: string;
  order_nsu: string;
  transaction_nsu: string;
  slug: string;
}

export interface PaymentCheckResponse {
  success: boolean;
  paid: boolean;
  amount: number;
  paid_amount: number;
  installments: number;
  capture_method: string;
}

export interface WebhookPayload {
  invoice_slug: string;
  amount: number;
  paid_amount: number;
  installments: number;
  capture_method: string;
  transaction_nsu: string;
  order_nsu: string;
  receipt_url: string;
  items: InfinitePayItem[];
}

class InfinitePayService {
  private baseUrl: string;
  private handle: string;

  constructor() {
    this.baseUrl = INFINITEPAY_CONFIG.API_BASE_URL;
    this.handle = INFINITEPAY_CONFIG.HANDLE;
    
    // Validar configuração na inicialização
    if (!validateInfinitePayConfig()) {
      console.warn('Configuração do InfinitePay inválida. Verifique as variáveis de ambiente.');
    }
  }

  /**
   * Cria um link de checkout para pagamento
   */
  async createCheckoutLink(data: CreateCheckoutLinkRequest): Promise<CreateCheckoutLinkResponse> {
    try {
      // Validar dados antes de enviar
      this.validateCheckoutData(data);
      
      const response = await fetch(`${this.baseUrl}${INFINITEPAY_CONFIG.ENDPOINTS.CREATE_CHECKOUT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          handle: this.handle,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `${INFINITEPAY_CONFIG.ERROR_MESSAGES.NETWORK_ERROR}: ${response.status} ${response.statusText} - ${errorData.message || 'Erro desconhecido'}`
        );
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao criar link de checkout:', error);
      throw error;
    }
  }

  /**
   * Verifica o status de um pagamento
   */
  async checkPaymentStatus(data: PaymentCheckRequest): Promise<PaymentCheckResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${INFINITEPAY_CONFIG.ENDPOINTS.CHECK_PAYMENT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          handle: this.handle,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `${INFINITEPAY_CONFIG.ERROR_MESSAGES.NETWORK_ERROR}: ${response.status} ${response.statusText} - ${errorData.message || 'Erro desconhecido'}`
        );
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      throw error;
    }
  }

  /**
   * Valida os dados do checkout antes de enviar
   */
  private validateCheckoutData(data: CreateCheckoutLinkRequest): void {
    const errors: string[] = [];

    if (!data.handle || data.handle === 'seu_handle_aqui') {
      errors.push(INFINITEPAY_CONFIG.ERROR_MESSAGES.INVALID_HANDLE);
    }

    if (!data.redirect_url) {
      errors.push('URL de redirecionamento é obrigatória');
    }

    if (!data.order_nsu) {
      errors.push('ID do pedido é obrigatório');
    }

    if (!data.items || data.items.length === 0) {
      errors.push('Pelo menos um item é obrigatório');
    }

    // Validar preços dos itens
    data.items.forEach((item, index) => {
      if (item.price < INFINITEPAY_CONFIG.PAYMENT.MIN_AMOUNT) {
        errors.push(`Item ${index + 1}: Preço mínimo é R$ ${INFINITEPAY_CONFIG.PAYMENT.MIN_AMOUNT / 100}`);
      }
      if (item.price > INFINITEPAY_CONFIG.PAYMENT.MAX_AMOUNT) {
        errors.push(`Item ${index + 1}: Preço máximo é R$ ${INFINITEPAY_CONFIG.PAYMENT.MAX_AMOUNT / 100}`);
      }
    });

    if (errors.length > 0) {
      throw new Error(`${INFINITEPAY_CONFIG.ERROR_MESSAGES.INVALID_DATA}: ${errors.join(', ')}`);
    }
  }

  /**
   * Converte preço de reais para centavos
   */
  convertToCents(price: number): number {
    return Math.round(price * 100);
  }

  /**
   * Converte preço de centavos para reais
   */
  convertFromCents(cents: number): number {
    return cents / 100;
  }

  /**
   * Retorna a configuração atual do serviço
   */
  getConfig() {
    return {
      handle: this.handle,
      baseUrl: this.baseUrl,
      isConfigured: validateInfinitePayConfig(),
    };
  }
}

// Instância padrão do serviço
export const infinitePayService = new InfinitePayService();

export default InfinitePayService;
