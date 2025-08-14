import { supabase } from "@/lib/supabase";
import { PlansT } from "@/types/PlansT";
import { VisaTypesT } from "@/types/VisaTypesT";


/***
 * @description Hook para buscar planos de visto com base no país e tipo de visto
 * @param country - País associado ao tipo de visto
 * @param visaType - Tipo de visto (ex: turismo, trabalho, estudo)
 * @returns Promise que resolves com o ID do tipo de visto ou null se não encontrado
 */
const fetchVisaPlans = async ({ country, visaType }: VisaTypesT): Promise<string | null> => {
    if (!country || !visaType) {
        return null;
    }

    const { data, error } = await supabase
        .from('visa_types')
        .select('id')
        .eq('country', country)
        .eq('visa_type', visaType)
        .eq('active', true)
        .single();

    if (error && error.code !== 'PGRST116') {
        throw new Error(`Erro ao buscar ID do tipo de visto: ${error.message}`);
    }

    return data?.id || null;
}

/**
 * @description Hook para buscar os planos dado um visaTypeId
 * @param visaTypeId - ID do tipo de visto
 * @returns Promise que resolve com os planos
 */
const fetchPlans = async (visaTypeId: string | null): Promise<PlansT[]> => {
    if (!visaTypeId) {
        return [];
    }

    const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('visa_type_id', visaTypeId)
        .eq('active', true)
        .order('price', { ascending: true });

    if (error) {
        throw new Error(`Erro ao buscar planos: ${error.message}`);
    }
}

