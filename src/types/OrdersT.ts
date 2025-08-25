import { PlansT } from "./PlansT";

/**
 * @description Tipagem para o pedido
 * @prop id - Identificador único do pedido
 * @prop responsible_user_id - Identificador único do usuário responsável pelo pedido
 * @prop applicants_quantity - Quantidade de candidatos do pedido
 * @prop plan_id - Identificador único do plano associado ao pedido
 * @prop payment_status - Status do pagamento
 * @prop payment_details - Detalhes do pagamento
 * @prop created_at - Data de criação do pedido
 */
export type OrderT = {
    id: string;
    responsible_user_id: string;
    applicants_quantity: number;
    plan_id: PlansT["id"];
    payment_status: 'pending' | 'completed' | 'failed' | 'cancelled';
    payment_details: {
      plan_name: PlansT["plan_name"];
      price: PlansT["price"];
      [key: string]: any;
    };
    created_at: string;
  };