import { VisasT } from "@/types/VisasT";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";

/***
 * @description Hook para buscar os tipos de visto do país via backend
 * @param country - País associado ao tipo de visto
 * @returns Array completo dos tipos de vistos
 */
export const useCountryVisaTypes = ({ country_key }: { country_key: string }) => {
    return useQuery<VisasT[], Error>({
        queryKey: ['visas', country_key],
        queryFn: async (): Promise<VisasT[]> => {
            if (!country_key) {
                return [];
            }

            try {
                // Usar a nova rota do backend: /api/visas/country/:country_key
                const response = await apiService.get<{ success: boolean; data: VisasT[] }>(`/api/visas/${country_key}`);
                return response.data || [];
            } catch (error) {
                console.error('Erro ao buscar tipos de visto:', error);
                throw new Error(`Erro ao buscar tipos de visto: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
            }
        },
        enabled: !!country_key,
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 10, // 10 minutos
    });
};

export default useCountryVisaTypes;