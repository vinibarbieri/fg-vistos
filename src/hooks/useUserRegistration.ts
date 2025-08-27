// src/hooks/useUserRegistration.ts
import { ProfileT } from "@/types/ProfilesT";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/services/api";

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
          
          // Redirecionar para checkout com orderId
          navigate(`/checkout?orderId=${response.data.order.id}`);
        } else {
          throw new Error(response.error || 'Erro ao registrar usuário');
        }

      } catch (error) {
        console.error('Erro no cadastro:', error);
        throw error; // Re-throw para o componente tratar
      }
    };

    return { handleSubmit };
};