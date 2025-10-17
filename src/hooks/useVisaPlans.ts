import { PlansT } from "@/types/PlansT";
import { useQuery } from "@tanstack/react-query";
import { useCountryVisaTypes } from "./useCountryVisaTypes";
import { apiService } from "@/services/api";

/**
 * @description Hook para buscar os planos via backend
 * @param visa_id - ID do tipo de visto
 * @returns Promise que resolve com os planos
 */
const fetchPlans = async (visa_id: string | null): Promise<PlansT[]> => {
    if (!visa_id) {
        return [];
    }

    try {
        const response = await apiService.get<{ success: boolean; data: PlansT[] }>(`/api/site-backend/plans?visa_id=${visa_id}`);
        return response.data || [];
    } catch (error) {
        console.error('Erro ao buscar planos:', error);
        throw new Error(`Erro ao buscar planos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
}

/***
 * @description Hook principal para buscar planos de visto via backend
 * @param params - Objeto contendo o país e tipo de visto
 * @returns Objeto contendo os planos, estado de carregamento e possíveis erros
 */
export const useVisaPlans = (params: {country_key: string, visa_type: string}) => {
    // Usar o hook existente para buscar os tipos de visto do país
    const { data: visaTypes, isLoading: isLoadingVisaTypes } = useCountryVisaTypes({ 
        country_key: params.country_key 
    });

    // Encontrar o tipo de visto específico
    const targetVisaType = visaTypes?.find(
        visa => visa.visa_type === params.visa_type
    );

    // Query para buscar os planos usando o visa_type_id encontrado
    const {
        data: plans,
        isLoading: isLoadingPlans,
        isError,
        error,
    } = useQuery<PlansT[], Error>({
        queryKey: ['plans', targetVisaType?.id],
        queryFn: () => fetchPlans(targetVisaType?.id || null),
        enabled: !!targetVisaType?.id,
        staleTime: 1000 * 60 * 60, // Os planos não mudam com frequência
        gcTime: 1000 * 60 * 60,
    });

    return {
        plans,
        isLoading: isLoadingVisaTypes || isLoadingPlans,
        isError,
        error,
        visaType: targetVisaType, // Retorna também o tipo de visto encontrado
    }
}

