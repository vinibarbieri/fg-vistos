import apiService from "@/services/api";
import { VisasT } from "@/types/VisasT";
import { useEffect, useState } from "react";

/***
 * @description Hook principal para buscar o tipo de visto via backend
 * @param visaId - ID do tipo de visto
 * @param enabled - Se deve executar a busca (padrão: true)
 * @returns Objeto contendo o tipo de visto, estado de carregamento e possíveis erros
 */
export const useVisasById = (visaId: string, enabled: boolean = true) => {
    const [visa, setVisa] = useState<VisasT | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Se não está habilitado ou não tem visaId, limpa os dados
        if (!enabled || !visaId) {
            setVisa(null);
            setError(null);
            setIsLoading(false);
            return;
        }
        
        const fetchVisa = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await apiService.get<{ success: boolean; data: VisasT }>(`/api/visas/${visaId}`);

                console.log('Response:', response);
                
                // O backend retorna um objeto único quando busca por ID
                const visaData = response.data || null;
                console.log('Visa data:', visaData);
                setVisa(visaData);
                setError(null);
            } catch (error) {
                console.error('Erro ao buscar visto:', error);
                const errorMessage = `Erro ao buscar visto: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
                setError(new Error(errorMessage));
                setVisa(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVisa();
    }, [visaId, enabled]);

    return {
        visa,
        isLoading,
        error
    };
};
