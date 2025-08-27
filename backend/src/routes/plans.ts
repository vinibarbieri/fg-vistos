import { Router } from 'express';
import { supabase } from '../config/database';

const router = Router();

// Listar planos por tipo de visto
router.get('/', async (req, res) => {
  try {
    const { visa_id } = req.query;
    
    if (!visa_id) {
      return res.status(400).json({
        success: false,
        error: 'visa_id é obrigatório'
      });
    }

    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('visa_id', visa_id)
      .eq('active', true)
      .order('price', { ascending: true });

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Buscar plano por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Plano não encontrado'
        });
      }
      throw error;
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Erro ao buscar plano:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

export default router;
