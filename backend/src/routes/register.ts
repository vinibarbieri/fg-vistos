import { Router } from 'express';
import { supabase } from '../config/database';
import { z } from 'zod';

const router = Router();

// Schema de validação para registro
const userRegistrationSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  quantity: z.number().min(1, 'Quantidade deve ser pelo menos 1'),
  planId: z.string().min(1, 'ID do plano é obrigatório'),
});

// Registrar novo usuário
router.post('/register', async (req, res) => {
  try {
    // Validar dados de entrada
    const validatedData = userRegistrationSchema.parse(req.body);
    const { name, email, password, quantity, planId } = validatedData;

    console.log('Iniciando cadastro...', { name, email, quantity, planId });

    // 1. Verificar se o email já está cadastrado
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', email)
      .single();

    if (existingProfile && !checkError) {
      return res.status(400).json({
        success: false,
        error: 'Este email já está cadastrado. Use outro email ou faça login com sua conta existente.'
      });
    }

    // 2. Criar usuário autenticado no Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (authError) {
      console.error('Erro na autenticação:', authError);
      return res.status(500).json({
        success: false,
        error: 'Erro ao criar usuário autenticado'
      });
    }

    console.log('Usuário autenticado criado:', authData);

    // 3. Inserir ou atualizar dados na tabela profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .upsert([{
        id: authData.user?.id,
        email,
        name,
        account_status: 'true',
        role: 'Cliente'
      }], {
        onConflict: 'id'
      })
      .select()
      .single();

    if (profileError) {
      console.error('Erro ao processar profile:', profileError);
      return res.status(500).json({
        success: false,
        error: 'Erro ao processar perfil do usuário'
      });
    }

    console.log('Profile processado:', profile);

    // 4. Criar order vinculada ao profile e plano
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        responsible_user_id: profile.id,
        plan_id: planId,
        applicants_quantity: quantity,
        payment_status: 'pendente'
      }])
      .select()
      .single();

    if (orderError) {
      console.error('Erro ao criar order:', orderError);
      return res.status(500).json({
        success: false,
        error: 'Erro ao criar pedido'
      });
    }

    console.log('Order criada:', order);

    // 5. Retornar sucesso com dados necessários
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: authData.user?.id,
          email,
          name
        },
        profile,
        order: {
          id: order.id,
          plan_id: planId,
          applicants_quantity: quantity,
          payment_status: 'pendente'
        }
      },
      message: 'Usuário registrado com sucesso'
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    
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

// Verificar se email já existe
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email é obrigatório'
      });
    }

    const { data: existingProfile, error } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    res.json({
      success: true,
      exists: !!existingProfile,
      message: existingProfile ? 'Email já cadastrado' : 'Email disponível'
    });

  } catch (error) {
    console.error('Erro ao verificar email:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

export default router;
