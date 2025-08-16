
/***
 * @description Tipagem para os tipos de visto
 * @prop id - Identificador único do tipo de visto
 * @prop name - Nome de exibição do tipo de visto
 * @prop country - País associado ao tipo de visto
 * @prop visa_type - Tipo de visto: visto || eta
 * @prop active - Indica se o tipo de visto está ativo
 */
export type VisaTypesT = {
    id: string;
    name: string;
    country: string;
    visa_type: string;
    active: boolean;
};