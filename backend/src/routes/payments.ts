import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { validate, paymentSchema } from '../middleware/validation';
import { infinitePayService } from '../services/infinitePay';

const router = Router();

// Criar checkout de pagamento
router.post('/create-checkout', 
  authMiddleware,
  validate(paymentSchema),
  async (req, res) => {
    try {
      const { amount, description, order_nsu, redirect_url } = req.body;
      
      const result = await infinitePayService.createCheckout({
        amount,
        description,
        order_nsu,
        redirect_url,
        webhook_url: `${req.protocol}://${req.get('host')}/api/payments/webhook`
      });

      res.json({
        success: true,
        checkout_url: result.url,
        message: 'Checkout criado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar checkout:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
);

// Verificar status do pagamento
router.post('/check-status',
  authMiddleware,
  async (req, res) => {
    try {
      const { order_nsu, transaction_nsu } = req.body;
      
      if (!order_nsu || !transaction_nsu) {
        return res.status(400).json({
          success: false,
          error: 'order_nsu e transaction_nsu são obrigatórios'
        });
      }

      const result = await infinitePayService.checkPayment({
        order_nsu,
        transaction_nsu
      });

      res.json({
        success: true,
        payment_status: result
      });
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
);

// Webhook do InfinitePay (não precisa de autenticação)
router.post('/webhook',
  async (req, res) => {
    try {
      const result = await infinitePayService.handleWebhook(req.body);
      
      if (result.success) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false });
      }
    } catch (error) {
      console.error('Erro no webhook:', error);
      res.status(500).json({ success: false });
    }
  }
);

export default router;
