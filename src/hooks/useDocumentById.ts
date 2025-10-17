import apiService from "@/services/api";
import { useEffect, useState } from "react";

/***
 * @description Hook genérico para buscar um documento via backend pelo id
 * @param id - ID do documento
 * @param document - Tipo de documento (ex: 'plans', 'visas')
 * @returns Objeto contendo o documento, estado de carregamento e possíveis erros
 */
export const useDocumentById = <T = any>(id: string, document: string, enabled: boolean = true) => {
    const [documentData, setDocumentData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!id || !document || !enabled) {
            setDocumentData(null);
            setError(null);
            setIsLoading(false);
            return;
        }
        
        const fetchDocument = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await apiService.get<{ success: boolean; data: T }>(`/api/site-backend/${document}/${id}`);

                console.log('Response:', response);
                
                // O backend retorna um objeto único quando busca por ID
                const data = response.data || null;
                console.log('Document data:', data);
                setDocumentData(data);
                setError(null);
            } catch (error) {
                console.error(`Erro ao buscar ${document}:`, error);
                const errorMessage = `Erro ao buscar ${document}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
                setError(new Error(errorMessage));
                setDocumentData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocument();
    }, [id, document]);

    return {
        documentData,
        isLoading,
        error
    };
};
