import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// Schema de validação para criação de checkout
const createCheckoutSchema = z.object({
  handle: z.string().min(1, 'Handle é obrigatório'),
  redirect_url: z.string().url('URL de redirecionamento inválida'),
  order_nsu: z.string().min(1, 'ID do pedido é obrigatório'),
  items: z.array(z.object({
    name: z.string().min(1, 'Nome do item é obrigatório'),
    price: z.number().min(300, 'Preço deve ser maior que 300'),
    quantity: z.number().min(1, 'Quantidade deve ser maior que 0'),
    description: z.string().min(1, 'Descrição do item é obrigatória')
  })).min(1, 'Pelo menos um item é obrigatório'),
  customer: z.object({
    name: z.string().min(1, 'Nome do cliente é obrigatório'),
    email: z.string().email('Email inválido'),
    document: z.string().optional(),
  }).optional()
});

// Schema para verificação de pagamento
const checkPaymentSchema = z.object({
  handle: z.string().min(1, 'Handle é obrigatório'),
  transaction_nsu: z.string().min(1, 'NSU da transação é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório')
});

// Criar link de checkout
router.post('/invoices/public/checkout/links', async (req, res) => {
  try {
    // Validar dados de entrada
    const validatedData = createCheckoutSchema.parse(req.body);
    
    console.log('Criando checkout InfinitePay:', {
      handle: validatedData.handle,
      order_nsu: validatedData.order_nsu,
      items_count: validatedData.items.length
    });

    // Fazer requisição para a API do InfinitePay
    const response = await fetch('https://api.infinitepay.io/invoices/public/checkout/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'FG-Vistos/1.0'
      },
      body: JSON.stringify(validatedData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as any;
      console.error('Erro na API do InfinitePay:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      return res.status(response.status).json({
        success: false,
        error: errorData?.message || 'Erro na API do InfinitePay',
        details: errorData
      });
    }

    const data = await response.json() as any;
    
    console.log('Checkout criado com sucesso:', {
      order_nsu: validatedData.order_nsu,
      checkout_id: data?.id || data?.checkout_id
    });

    res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Erro ao criar checkout:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: error.errors
      });
    }

    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Verificar status de pagamento
router.post('/invoices/public/checkout/payment_check', async (req, res) => {
  try {
    // Validar dados de entrada
    const validatedData = checkPaymentSchema.parse(req.body);
    
    console.log('Verificando pagamento:', {
      handle: validatedData.handle,
      transaction_nsu: validatedData.transaction_nsu
    });

    // Fazer requisição para a API do InfinitePay
    const response = await fetch('https://api.infinitepay.io/invoices/public/checkout/payment_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(validatedData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as any;
      console.error('Erro ao verificar pagamento:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      return res.status(response.status).json({
        success: false,
        error: errorData?.message || 'Erro ao verificar pagamento',
        details: errorData
      });
    }

    const data = await response.json() as any;
    
    console.log('Pagamento verificado:', {
      transaction_nsu: validatedData.transaction_nsu,
      status: data?.status
    });

    res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: error.errors
      });
    }

    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

export default router;
