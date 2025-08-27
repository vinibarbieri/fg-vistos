// src/hooks/useUserRegistration.ts
import { supabase } from "@/services/supabase";
import { ProfileT } from "@/types/ProfilesT";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export interface UserRegistrationData extends ProfileT {
  password: string;
  quantity: number;
}

export const useUserRegistration = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const planId = searchParams.get('planId');
    
    const handleSubmit = async (userData: UserRegistrationData) => {
      try {
        console.log('Iniciando cadastro...', { userData, planId });
        
        // 0. Verificar se o email já está cadastrado
        const { data: existingProfile, error: checkError } = await supabase
          .from('profiles')
          .select('id, email')
          .eq('email', userData.email)
          .single();
        
        if (existingProfile && !checkError) {
          throw new Error('Este email já está cadastrado. Use outro email ou faça login com sua conta existente.');
        }
        
        // 1. Limpar qualquer sessão existente para evitar conflitos
        await supabase.auth.signOut();
        
        // 2. Criar usuário autenticado no Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              name: userData.name,
            }
          }
        });
        
        if (authError) {
          console.error('Erro na autenticação:', authError);
          throw authError;
        }
        
        console.log('Usuário autenticado criado:', authData);
        
        // 3. Inserir ou atualizar dados na tabela profiles usando upsert
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .upsert([{
            id: authData.user?.id,
            email: userData.email,
            name: userData.name,
            account_status: 'true',
            role: 'Cliente'
          }], {
            onConflict: 'id' // Usar ID como chave de conflito
          })
          .select()
          .single();
        
        if (profileError) {
          console.error('Erro ao processar profile:', profileError);
          throw profileError;
        }
        
        console.log('Profile processado:', profile);
        
        // 4. Criar order vinculada ao profile e plano
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([{
            responsible_user_id: profile.id,
            plan_id: planId,
            applicants_quantity: userData.quantity,
            payment_status: 'pendente',
            payment_details: {
              plan_name: searchParams.get('planName'),
              price: searchParams.get('price')
            }
          }])
          .select()
          .single();
        
        if (orderError) {
          console.error('Erro ao criar order:', orderError);
          throw orderError;
        }
        
        console.log('Order criada:', order);

        // 5. Redirecionar para checkout com orderId
        navigate(`/checkout?orderId=${order.id}`);

      } catch (error) {
        console.error('Erro no cadastro:', error);
        throw error; // Re-throw para o componente tratar
      }
    };

    return { handleSubmit };
};