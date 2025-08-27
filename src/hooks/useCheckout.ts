import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { checkoutApi } from "@/services/api";

export const useCheckout = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    
    // Buscar dados completos da order via backend
    const { data: orderData, isLoading, error } = useQuery({
      queryKey: ['order', orderId],
      queryFn: async () => {
        if (!orderId) return null;
        
        const response = await checkoutApi.getOrder(orderId);
        return response.data;
      },
      enabled: !!orderId,
    });

    return { orderData, isLoading, error };
};