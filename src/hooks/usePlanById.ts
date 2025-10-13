import apiService from "@/services/api";
import { PlansT } from "@/types/PlansT";
import { useEffect, useState } from "react";

/***
 * @description Hook principal para buscar o plano via backend
 * @param planId - ID do plano
 * @returns Objeto contendo o plano, estado de carregamento e possíveis erros
 */
export const usePlanById = (planId: string) => {
    const [plan, setPlan] = useState<PlansT | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!planId) {
            setPlan(null);
            setError(null);
            setIsLoading(false);
            return;
        }
        
        const fetchPlan = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await apiService.get<{ success: boolean; data: PlansT }>(`/api/plans/${planId}`);

                console.log('Response:', response);
                
                // O backend retorna um objeto único quando busca por ID
                const planData = response.data || null;
                console.log('Plan data:', planData);
                setPlan(planData);
                setError(null);
            } catch (error) {
                console.error('Erro ao buscar plano:', error);
                const errorMessage = `Erro ao buscar plano: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
                setError(new Error(errorMessage));
                setPlan(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlan();
    }, [planId]);

    return {
        plan,
        isLoading,
        error
    };
};
