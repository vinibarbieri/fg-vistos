// src/hooks/useUserRegistration.ts
import { supabase } from "@/lib/supabase";
import { ProfileT } from "@/types/ProfilesT";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export interface UserRegistrationData extends ProfileT {
  password: string;
}

export const useUserRegistration = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const planId = searchParams.get('planId');
    
    const handleSubmit = async (userData: UserRegistrationData) => {
      try {
        console.log('Iniciando cadastro...', { userData, planId });
        
        // 1. Criar usuário autenticado no Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password, // Senha padrão temporária
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
        
        // 2. Inserir dados adicionais na tabela profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user?.id, // Usar o ID do usuário autenticado
            email: userData.email,
            name: userData.name,
            account_status: 'active',
            role: 'customer'
          }])
          .select()
          .single();
        
        if (profileError) {
          console.error('Erro ao criar profile:', profileError);
          throw profileError;
        }
        
        console.log('Profile criado:', profile);
        
        // 3. Criar order vinculada ao profile e plano
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([{
            responsible_user_id: profile.id,
            plan_id: planId,
            applicants_quantity: 1,
            payment_status: 'pending',
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

        // 4. Redirecionar para checkout com orderId
        navigate(`/checkout?orderId=${order.id}`);

      } catch (error) {
        console.error('Erro no cadastro:', error);
        throw error; // Re-throw para o componente tratar
      }
    };

    return { handleSubmit };
};