import { supabase } from "@/lib/supabase";
import { PlansT } from "@/types/PlansT";
import { useQuery } from "@tanstack/react-query";

/***
 * @description Hook para buscar planos de visto com base no país e tipo de visto
 * @param country - País associado ao tipo de visto
 * @param visa_type - Tipo de visto (ex: turismo, trabalho, estudo)
 * @returns Promise que resolves com o ID do tipo de visto ou null se não encontrado
 */
const fetchVisaTypeId = async ({ country, visa_type }): Promise<string | null> => {
    if (!country || !visa_type) {
        return null;
    }

    const { data, error } = await supabase
        .from('visa_types')
        .select('id')
        .eq('country', country)
        .eq('visa_type', visa_type)
        .eq('active', true)
        .single();

    if (error && error.code !== 'PGRST116') {
        throw new Error(`Erro ao buscar ID do tipo de visto: ${error.message}`);
    }

    return data?.id || null;
}

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
export const useVisaPlans = (params: {country: string, visa_type: string}) => {
    // Query 1: Buscar o visa_type_id
    const { data: visa_type_id, isLoading: isLoadingVisaTypeId } = useQuery<string | null, Error>({
        queryKey: ['visa_type_id', params.country, params.visa_type],
        queryFn: () => fetchVisaTypeId(params),
        enabled: !!params.country && !!params.visa_type,
        staleTime: 1000 * 60 * 60, // O ID do tipo de visto não muda com frequência, cache mais longo
        gcTime: 1000 * 60 * 60,
    });

    // Query 2: Buscar os planos usando o visa_type_id
    const {
        data: plans,
        isLoading: isLoadingPlans,
        isError,
        error,
    } = useQuery<PlansT[], Error>({
        queryKey: ['plans', visa_type_id],
        queryFn: () => fetchPlans(visa_type_id),
        enabled: !!visa_type_id,
        staleTime: 1000 * 60 * 60, // Os planos também não mudam com frequência
        gcTime: 1000 * 60 * 60,
    });

    return {
        plans,
        isLoading: isLoadingVisaTypeId || isLoadingPlans,
        isError,
        error,
    }

}

