import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { validate, vistosSchema } from '../middleware/validation';
import { supabase } from '../config/database';

const router = Router();

// Listar todos os vistos (com paginação)
router.get('/', 
  async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const { data, error, count } = await supabase
        .from('visas')
        .select('*', { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data,
        pagination: {
          page,
          limit,
          total: count || 0,
          pages: Math.ceil((count || 0) / limit)
        }
      });
    } catch (error) {
      console.error('Erro ao listar vistos:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
);

// Buscar visto por ID
router.get('/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      
      const { data, error } = await supabase
        .from('visas')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({
            success: false,
            error: 'Visto não encontrado'
          });
        }
        throw error;
      }

      res.json({
        success: true,
        data
      });
    } catch (error) {
      console.error('Erro ao buscar visto:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
);

// Listar tipos de visto por país (não precisa de autenticação para leitura)
router.get('/:country_key', async (req, res) => {
  try {
    const { country_key } = req.params;
    
    if (!country_key) {
      return res.status(400).json({
        success: false,
        error: 'country_key é obrigatório'
      });
    }

    const { data, error } = await supabase
      .from('visas')
      .select('*')
      .eq('country_key', country_key)
      .eq('active', true)
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Erro ao buscar tipos de visto:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Criar novo visto
router.post('/',
  authMiddleware,
  validate(vistosSchema),
  async (req, res) => {
    try {
      const { name, email, phone, status } = req.body;
      
      const { data, error } = await supabase
        .from('visas')
        .insert({
          name,
          email,
          phone,
          status,
          user_id: req.user.id // ID do usuário autenticado
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        data,
        message: 'Visto criado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar visto:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
);

// Atualizar visto
router.put('/:id',
  authMiddleware,
  validate(vistosSchema),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone, status } = req.body;
      
      const { data, error } = await supabase
        .from('visas')
        .update({
          name,
          email,
          phone,
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({
            success: false,
            error: 'Visto não encontrado'
          });
        }
        throw error;
      }

      res.json({
        success: true,
        data,
        message: 'Visto atualizado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao atualizar visto:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
);

// Deletar visto
router.delete('/:id',
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      
      const { error } = await supabase
        .from('visas')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        message: 'Visto deletado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao deletar visto:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
);

export default router;
