import { Router } from 'express';
import { supabase } from '../config/database';
import { z } from 'zod';

const router = Router();

// Schema de validação para checkout
const checkoutSchema = z.object({
  orderId: z.string().min(1, 'ID da order é obrigatório')
});

// Buscar dados completos da order
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({
        success: false,
        error: 'ID da order é obrigatório'
      });
    }

    // Buscar dados completos da order com relacionamentos
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (id, name, email),
        plans (
          id, 
          plan_name, 
          price,
          visas (name, country)
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Order não encontrada'
        });
      }
      throw error;
    }

    res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Erro ao buscar dados da order:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Atualizar status de pagamento da order
router.put('/order/:orderId/payment-status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { payment_status, payment_details } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        error: 'ID da order é obrigatório'
      });
    }

    if (!payment_status) {
      return res.status(400).json({
        success: false,
        error: 'Status do pagamento é obrigatório'
      });
    }

    // Atualizar status da order
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        payment_status,
        payment_details: {
          ...payment_details,
          updated_at: new Date().toISOString()
        }
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Order não encontrada'
        });
      }
      throw error;
    }

    res.json({
      success: true,
      data,
      message: 'Status do pagamento atualizado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao atualizar status do pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Verificar status de pagamento
router.post('/payment/check', async (req, res) => {
  try {
    const { orderId, transactionNsu, slug } = req.body;

    if (!orderId || !transactionNsu || !slug) {
      return res.status(400).json({
        success: false,
        error: 'orderId, transactionNsu e slug são obrigatórios'
      });
    }

    // Aqui você pode implementar a lógica de verificação do InfinitePay
    // Por enquanto, vamos retornar um status mock
    const mockPaymentStatus = {
      success: true,
      paid: Math.random() > 0.5, // Simula pagamento aprovado/rejeitado
      amount: 29990, // Em centavos
      paid_amount: 29990,
      installments: 1,
      capture_method: 'credit_card'
    };

    res.json({
      success: true,
      data: mockPaymentStatus
    });

  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Processar retorno do pagamento
router.post('/payment/return', async (req, res) => {
  try {
    const { orderId, transactionNsu, slug, receiptUrl, captureMethod } = req.body;

    if (!orderId || !transactionNsu || !slug) {
      return res.status(400).json({
        success: false,
        error: 'orderId, transactionNsu e slug são obrigatórios'
      });
    }

    // Atualizar order com dados do pagamento
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        payment_status: 'pago',
        payment_details: {
          transaction_nsu: transactionNsu,
          slug: slug,
          receipt_url: receiptUrl,
          capture_method: captureMethod,
          paid_at: new Date().toISOString(),
          installments: 1
        }
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data,
      message: 'Retorno do pagamento processado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao processar retorno do pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

export default router;
