
/***
 * @description Tipagem para os tipos de visto
 * @prop id - Identificador único do tipo de visto
 * @prop name - Nome de exibição do tipo de visto
 * @prop visa_type - Tipo de visto: visto || eta
 * @prop active - Indica se o tipo de visto está ativo
 * @prop country_key - Chave do país associado ao tipo de visto
 */
export type VisaTypesT = {
    id: string;
    name: string;
    visa_type: string;
    active: boolean;
    country_key: string;
};