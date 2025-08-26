import { supabase } from "@/lib/supabase";
import { PlansT } from "@/types/PlansT";
import { useQuery } from "@tanstack/react-query";
import { useCountryVisaTypes } from "./useCountryVisaTypes";

/**
 * @description Hook para buscar os planos dado um visaTypeId
 * @param visa_type_id - ID do tipo de visto
 * @returns Promise que resolve com os planos
 */
const fetchPlans = async (visa_type_id: string | null): Promise<PlansT[]> => {
    if (!visa_type_id) {
        return [];
    }

    const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('visa_type_id', visa_type_id)
        .eq('active', true)
        .order('price', { ascending: true });

    if (error) {
        throw new Error(`Erro ao buscar planos: ${error.message}`);
    }

    return data as PlansT[];
}

/***
 * @description Hook principal para buscar planos de visto
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
        visaType => visaType.visa_type === params.visa_type
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

