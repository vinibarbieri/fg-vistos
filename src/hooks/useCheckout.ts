import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useCheckout = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    
    // Buscar dados completos da order
    const { data: orderData } = useQuery({
      queryKey: ['order', orderId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            profiles (id, name),
            plans (id, plan_name, price)
          `)
          .eq('id', orderId)
          .single();
        
        if (error) throw error;
        return data;
      }
    });

    return { orderData };
};