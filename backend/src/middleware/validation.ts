import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// Função para criar middleware de validação
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valida body, query e params
      const dataToValidate = {
        body: req.body,
        query: req.query,
        params: req.params
      };

      schema.parse(dataToValidate);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        return res.status(400).json({
          error: 'Dados inválidos',
          details: errors
        });
      }
      
      return res.status(500).json({
        error: 'Erro na validação'
      });
    }
  };
};

// Schemas de validação comuns
export const paymentSchema = z.object({
  body: z.object({
    amount: z.number().min(30000, 'Valor mínimo é R$ 300,00'),
    description: z.string().min(3, 'Descrição deve ter pelo menos 3 caracteres'),
    order_nsu: z.string().min(1, 'ID do pedido é obrigatório')
  })
});

export const vistosSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    status: z.enum(['pendente', 'pago', 'falhou']).default('pendente')
  })
});
