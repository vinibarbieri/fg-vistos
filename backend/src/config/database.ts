import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórios');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Teste de conexão
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('visas').select('count').limit(1);
    if (error) {
      console.warn('Aviso: Erro ao conectar com Supabase:', error.message);
    } else {
      console.log('✅ Conectado ao Supabase com sucesso');
    }
  } catch (error) {
    console.warn('Aviso: Não foi possível testar conexão com Supabase');
  }
};
