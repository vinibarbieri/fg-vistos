import { supabase } from "@/lib/supabase";
import { ProfileT } from "@/types/ProfilesT";
import { useSearchParams } from "react-router-dom";

export const useUserRegistration = () => {
    const [searchParams] = useSearchParams();
    const planId = searchParams.get('planId');
    
    const handleSubmit = async (userData: ProfileT) => {
      try {
        // 1. Criar profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .insert([{
            email: userData.email,
            name: userData.name,
          }])
          .select()
          .single();
        
        if (profileError) throw profileError;
        
        // 2. Criar order vinculada ao profile e plano
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([{
            responsible_user_id: profile.id,
            plan_id: planId,
            payment_status: 'pending',
          }])
          .select()
          .single();
        
        if (orderError) throw orderError;

        // 3. Redirecionar para checkout com orderId
        window.location.href = `/checkout?orderId=${order.id}`;

      } catch (error) {
        console.error('Erro no cadastro:', error);
      }
    };

    return { handleSubmit };
  };