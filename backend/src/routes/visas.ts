import { Router } from 'express';
import { supabase } from '../config/database';

const router = Router();

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

export default router;
