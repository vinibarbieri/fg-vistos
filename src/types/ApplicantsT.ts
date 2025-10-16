import { OrderT } from "./OrdersT"
import { ProfileT } from "./ProfilesT"

/**
 * @description Tipagem de applicants igual a modelagem do banco
 */
export type ApplicantsT = {
   /**
    * @prop id - uuid do applicants
    */
   id: string
   /**
    * @prop responsible_user_id - uuid do user responsável
    */
   responsible_user_id: ProfileT["id"]
   /**
    * @prop order_id - uuid da order do applicant
    */
   order_id: OrderT["id"]
   /**
    * @prop is_responsible - define se o applicant é o responsável pela order
    */
   is_responsible: boolean
   /**
    * @prop name - nome do applicant
    */
   name: string
   /**
    * @prop status - enum do status do processo [pendente, pago, documentos_enviados, documentos_em_analise, aprovado, rejeitado]
    */
   status: string
   /**
    * @prop creatd_at - timestamp da criação do applicant
    */
   created_at: string
   /**
    * @prop updated_at - timestamp da última atualização do applicant
    */
   updated_at: string
   /**
    * @prop form_answer - jsonb com as respostas do form
    */
   form_answer: string
   /**
    * @prop form_status - enum [NULL, em_andamento, submetido, em_revisao, aprovado, rejeitado]
    */
   form_status: string
   /**
    * @prop attachment_id - id do documento
    */
   attachment_id: string
}