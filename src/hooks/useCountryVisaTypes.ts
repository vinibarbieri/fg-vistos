import { supabase } from "@/services/supabase";
import { VisaTypesT } from "@/types/VisaTypesT";
import { useQuery } from "@tanstack/react-query";

/***
 * @description Hook para buscar os tipos de visto do país
 * @param country - País associado ao tipo de visto
 * @returns Array completo dos tipos de vistos
 */
export const useCountryVisaTypes = ({ country_key }: { country_key: string }) => {
    return useQuery<VisaTypesT[], Error>({
        queryKey: ['visa-types', country_key],
        queryFn: async (): Promise<VisaTypesT[]> => {
            if (!country_key) {
                return [];
            }

            const { data, error } = await supabase
                .from('visa_types')
                .select('*')
                .eq('country_key', country_key)
                .eq('active', true);

            if (error && error.code !== 'PGRST116') {
                throw new Error(`Erro ao buscar ID do tipo de visto: ${error.message}`);
            }

            // Retorna o array completo dos tipos de visto
            return data as VisaTypesT[] || [];
        },
        enabled: !!country_key,
    });
};

export default useCountryVisaTypes;