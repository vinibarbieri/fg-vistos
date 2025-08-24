import { supabase } from "@/lib/supabase";
import { VisaTypesT } from "@/types/VisaTypesT";
import { useQuery } from "@tanstack/react-query";

/***
 * @description Hook para buscar os tipos de visto do país
 * @param country - País associado ao tipo de visto
 * @returns Array completo dos tipos de vistos
 */
export const useCountryVisaTypes = ({ country }: { country: string }) => {
    return useQuery<VisaTypesT[], Error>({
        queryKey: ['visa-types', country],
        queryFn: async (): Promise<VisaTypesT[]> => {
            if (!country) {
                return [];
            }

            const { data, error } = await supabase
                .from('visa_types')
                .select('*')
                .eq('country_key', country)
                .eq('active', true);

            if (error && error.code !== 'PGRST116') {
                throw new Error(`Erro ao buscar ID do tipo de visto: ${error.message}`);
            }

            // Retorna o array completo dos tipos de visto
            return data as VisaTypesT[] || [];
        },
        enabled: !!country,
    });
};

export default useCountryVisaTypes;