// src/hooks/useUserRegistration.ts
import { ProfileT } from "@/types/ProfilesT";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/services/api";
import { useInfinitePayCheckout } from "./useInfinitePayCheckout";
import { useState, useEffect } from "react";
import { INFINITEPAY_CONFIG } from "@/services/infinitePay_config";

export interface UserRegistrationData extends ProfileT {
  password: string;
  quantity: number;
}

export const useUserRegistration = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const planId = searchParams.get('planId');
    const [orderId, setOrderId] = useState<string | null>(null);
    const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
    
    // Usar o hook seguro do InfinitePay
    const { 
      orderData, 
      isLoadingOrder, 
      isCreatingCheckout, 
      checkoutError, 
      createCheckout 
    } = useInfinitePayCheckout(orderId);
    
    // Efeito para criar checkout automaticamente quando os dados da order estiverem carregados
    useEffect(() => {
      if (isRegistrationComplete && orderData && !isCreatingCheckout && !checkoutError) {
        console.log('Dados da order carregados, criando checkout...');
        createCheckout().catch((error) => {
          console.error('Erro ao criar checkout:', error);
        });
      }
    }, [isRegistrationComplete, orderData, isCreatingCheckout, checkoutError, createCheckout]);
    
    const handleSubmit = async (userData: UserRegistrationData) => {
      try {
        console.log('Iniciando cadastro...', { userData, planId });
        
        // Preparar dados para o backend
        const registrationData = {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          quantity: userData.quantity,
          planId: planId || ''
        };

        // Chamar o backend para registrar o usuário
        const response = await authApi.register(registrationData);
        
        if (response.success) {
          console.log('Usuário registrado com sucesso:', response.data);
          
          // Definir o orderId para ativar o hook useInfinitePayCheckout
          setOrderId(response.data.order.id);
          setIsRegistrationComplete(true);
          
        } else {
          throw new Error(response.error || 'Erro ao registrar usuário');
        }

      } catch (error) {
        console.error('Erro no cadastro:', error);
        throw error; // Re-throw para o componente tratar
      }
    };

    return { 
      handleSubmit,
      // Expor estados do checkout para o componente
      orderData,
      isLoadingOrder,
      isCreatingCheckout,
      checkoutError,
      isRegistrationComplete
    };
};