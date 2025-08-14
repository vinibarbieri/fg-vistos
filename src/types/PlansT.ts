import { VisaTypesT } from "./VisaTypesT";

/***
 * @description Tipagem para os planos
 * @prop id - Identificador único do plano
 * @prop plan_name - Nome do plano
 * @prop description - Descrição do plano
 * @prop price - Preço do plano
 * @prop active - Indica se o plano está ativo
 * @prop visa_type_id - Identificador do tipo de visto associado ao plano
 */
export type PlansT = {
    id: string;
    planName: string;
    description: string;
    price: number;
    active: boolean;
    visaTypeId: VisaTypesT["id"];
};